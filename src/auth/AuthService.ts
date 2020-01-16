import Axios from 'axios'
import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common'
import { ConfigService } from 'config/ConfigService'
import { ApiLayers } from 'infrastructure/constants/ApiLayers'
import { NonceHelper } from 'infrastructure/helper/NonceHelper'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'
import { ObfuscationHelper } from 'infrastructure/helper/ObfuscationHelper'
import { ErrorDto } from 'error/ErrorDto'
import { ShopifyAuthLinkBuilder } from './ShopifyAuthLinkBuilder'
import { Validator } from 'infrastructure/validator/Validator'
import { AuthValidatorFactory } from './AuthValidatorFactory'
import { AuthParamsValidator } from './AuthParamsValidator'
import { AuthResponseLinkValidator } from './AuthResponseLinkValidator'
import { ShopifyConstants } from 'infrastructure/constants/ShopifyConstants'
import { UserFacade } from 'user/UserFacade'
import { UserDto } from 'user/dto/UserDto'
import { UserCreateDto } from 'user/dto/UserCreateDto'
import { ShopifyCallbackQuery } from './types/ShopifyCallbackQuery'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly validatorFactory: AuthValidatorFactory,
    private readonly userFacade: UserFacade,
  ) {}

  handleOAuth(response, shop: string) {
    const paramsValidator: Validator = this.validatorFactory.getValidator(AuthParamsValidator.name)

    if (!paramsValidator.isValid(shop)) {
      throw new HttpException('Shop parameter cannot be null or empty!', HttpStatus.BAD_REQUEST)
    }

    const shopifyAuthUrl = this.createShopifyAuthUrl(response, shop)
    response.status(302).redirect(shopifyAuthUrl)
  }

  handleOAuthCallback(request, response) {
    const responseLinkValidator: Validator = this.validatorFactory.getValidator(AuthResponseLinkValidator.name)
    const query: ShopifyCallbackQuery = request.query

    if (!responseLinkValidator.isValid(query, request)) {
      throw new UnauthorizedException()
    }

    this.obtainAccessToken(query, response)
  }

  handleLogout(response) {
    CookieHelper.deleteCookie(response, 'ss')
    CookieHelper.deleteCookie(response, 'pfx')
    CookieHelper.deleteCookie(response, 'id')

    return response.status(204).send()
  }

  private createShopifyAuthUrl(response, shop: string): string {
    const redirectUri = `${this.configService.get('FORWARDING_ADDRESS')}/${ApiLayers.SESSIONS}install/callback`
    const nonce = NonceHelper.generateNonce()

    CookieHelper.createCookie(response, 'nonce', nonce, {
      expires: new Date(new Date().getTime() + 3 * 1000 * 60),
    })

    return new ShopifyAuthLinkBuilder()
      .withShopName(shop)
      .withApiKey(this.configService.get('SHOPIFY_API_KEY'))
      .withRedirectUri(redirectUri)
      .withNonce(nonce)
      .withScopes(this.configService.get('SHOPIFY_SCOPES'))
      .build()
  }

  private obtainAccessToken(query: ShopifyCallbackQuery, response): void {
    const payload = {
      client_id: this.configService.get('SHOPIFY_API_KEY'),
      client_secret: this.configService.get('SHOPIFY_API_SECRET'),
      code: query.code,
    }

    Axios.post(`https://${query.shop}/admin/oauth/access_token`, payload)
      .then(({ data }) => {
        this.createAuthCookies(response, query.shop, data.access_token)
        this.fetchAndStoreShop(response, query.shop, data.access_token)
      })
      .catch(({ message }) => response.status(401).send(new ErrorDto(401, 'Unauthorized', message)))
  }

  private createAuthCookies(response, shopName: string, accessToken: string): void {
    CookieHelper.createCookie(response, 'ss', ObfuscationHelper.encrypt(accessToken))
    CookieHelper.createCookie(response, 'pfx', ObfuscationHelper.encrypt(shopName))
  }

  private fetchAndStoreShop(response, shopName: string, accessToken: string): void {
    const fields = 'email,myshopify_domain,domain,name,shop_owner'
    const requestConfig = { headers: { 'X-Shopify-Access-Token': accessToken } }
    const url = `https://${shopName + ShopifyConstants.SHOPIFY_API_URL}/shop.json?fields=${fields}`

    Axios.get(url, requestConfig)
      .then(async ({ data: { shop } }) => {
        await this.fetchCallback(response, shopName, { ...shop, accessToken })
      })
      .catch(({ message }) => response.status(401).send(new ErrorDto(401, 'Unauthorized', message)))
  }

  private async fetchCallback(response, shopName: string, data) {
    const payload: UserCreateDto = {
      ...data,
      domain: data.domain,
      shopName: data.name,
      ownerName: data.shop_owner,
      originalDomain: data.myshopify_domain,
    }

    const user: UserDto = await this.userFacade.fetchOrCreate(shopName, payload)
    CookieHelper.createCookie(response, 'id', user.id.toString())

    return response.status(302).redirect(this.configService.get('LANDING_URL'))
  }
}
