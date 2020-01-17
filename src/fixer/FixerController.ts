import { Controller, Post, Body } from '@nestjs/common'
import { ApiLayers } from 'infrastructure/constants/ApiLayers'
import { FixerFacade } from './FixerFacade'
import { FixerDto } from './dto/FixerDto'
import { Cookie } from 'infrastructure/decorator/CookieDecorator'
import { Cookies } from 'infrastructure/constants/Cookies'

@Controller(ApiLayers.FIXERS)
export class FixerController {
  constructor(private readonly fixerFacade: FixerFacade) {}

  @Post()
  async fixEndpoint(
    @Body() dto: FixerDto,
    @Cookie(Cookies.ORIGINAL_DOMAIN) shopPrefix: string,
    @Cookie(Cookies.SESSION) session: string,
    @Cookie(Cookies.USER_ID) userId: number,
  ) {
    await this.fixerFacade.fix(dto.type, { userId, shopPrefix, session })
  }
}
