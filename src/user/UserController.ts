import { Controller, Get, Req, UseGuards, Post } from '@nestjs/common'
import { ApiLayers } from 'infrastructure/constants/ApiLayers'
import { UserFacade } from './UserFacade'
import { ShopifyAuthGuard } from 'auth/ShopifyAuthGuard'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'

@Controller()
export class UserController {
  constructor(private readonly facade: UserFacade) {}

  @UseGuards(ShopifyAuthGuard)
  @Get(ApiLayers.SESSIONS + 'me')
  async fetchEndpoint(@Req() request) {
    const originalDomain: string = CookieHelper.obtainCookie(request, 'pfx')
    const accessToken: string = CookieHelper.obtainCookie(request, 'ss')

    return this.facade.handleFetch(originalDomain, accessToken)
  }

  @UseGuards(ShopifyAuthGuard)
  @Post(ApiLayers.USERS + 'skip-onboarding')
  async skipOnboarding(@Req() request) {
    const userId: number = CookieHelper.userIdCookie(request)
    await this.facade.completeOnboarding(userId)
  }
}
