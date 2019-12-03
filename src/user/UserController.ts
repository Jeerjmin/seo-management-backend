import { Controller, Get, Res, Req } from '@nestjs/common'
import { ApiLayers } from 'infrastructure/constants/ApiLayers'
import { UserFacade } from './UserFacade'

@Controller()
export class UserController {
  constructor(private readonly facade: UserFacade) {}

  @Get(ApiLayers.SESSIONS + 'me') async fetchEndpoint(@Req() request, @Res() response) {
    await this.facade.handleFetch(request, response)
  }
}
