import { Controller, Get, UseGuards, Post } from '@nestjs/common'
import { ApiLayers } from 'infrastructure/constants/ApiLayers'
import { UserFacade } from './UserFacade'
import { ShopifyAuthGuard } from 'auth/ShopifyAuthGuard'
import { Cookies } from 'infrastructure/constants/Cookies'
import { Cookie } from 'infrastructure/decorator/CookieDecorator'

@Controller()
export class UserController {
  constructor(private readonly facade: UserFacade) {}

  @UseGuards(ShopifyAuthGuard)
  @Get(ApiLayers.SESSIONS + 'me')
  async fetchEndpoint(
    @Cookie(Cookies.ORIGINAL_DOMAIN) originalDomain: string,
    @Cookie(Cookies.SESSION) session: string,
  ) {
    return this.facade.handleFetch(originalDomain, session)
  }

  @UseGuards(ShopifyAuthGuard)
  @Post(ApiLayers.USERS + 'skip-onboarding')
  async skipOnboarding(@Cookie(Cookies.USER_ID) userId: number) {
    await this.facade.completeOnboarding(userId)
  }
}
