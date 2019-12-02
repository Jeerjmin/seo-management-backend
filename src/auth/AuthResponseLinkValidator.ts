import { ConfigService } from 'config/ConfigService'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'
import { HmacValidatorHelper } from 'infrastructure/helper/HmacValidatorHelper'
import { Validator } from 'infrastructure/validator/Validator'

export class AuthResponseLinkValidator implements Validator {
  constructor(private readonly configService: ConfigService) {}

  isValid(...args): boolean {
    const [query, request] = args

    const apiSecret = this.configService.get('SHOPIFY_API_SECRET')
    const hostnamePattern = /[a-zA-Z0-9][a-zA-Z0-9\-]*\.myshopify\.com[\/]?/

    return (
      query.state === CookieHelper.obtainCookie(request, 'nonce') ||
      HmacValidatorHelper.checkHmacValidity(apiSecret, query) ||
      query.shop.match(hostnamePattern)
    )
  }
}
