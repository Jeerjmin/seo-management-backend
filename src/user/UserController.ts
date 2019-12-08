import { Controller, Get, Res, Req, UseGuards } from '@nestjs/common'
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
}
