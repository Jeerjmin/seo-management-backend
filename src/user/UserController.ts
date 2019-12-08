import { Controller, Get, Res, Req, UseGuards, Post } from '@nestjs/common'
import { ApiLayers } from 'infrastructure/constants/ApiLayers'
import { UserFacade } from './UserFacade'
import { ShopifyAuthGuard } from 'auth/ShopifyAuthGuard'

@Controller()
export class UserController {
  constructor(private readonly facade: UserFacade) {}

  @UseGuards(ShopifyAuthGuard)
  @Get(ApiLayers.SESSIONS + 'me')
  async fetchEndpoint(@Req() request, @Res() response) {
    await this.facade.handleFetch(request, response)
  }

  @UseGuards(ShopifyAuthGuard)
  @Post(ApiLayers.USERS + 'skip-onboarding')
  async skipOnboarding(@Req() request) {
    await this.facade.skipOnboarding(request)
  }
}
