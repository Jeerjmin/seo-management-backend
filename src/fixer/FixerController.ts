import { Controller, Post, Body, Req } from '@nestjs/common'
import { ApiLayers } from 'infrastructure/constants/ApiLayers'
import { FixerFacade } from './FixerFacade'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'
import { FastifyRequest } from 'fastify'
import { FixerDto } from './dto/FixerDto'
import { ObfuscationHelper } from 'infrastructure/helper/ObfuscationHelper'

@Controller(ApiLayers.FIXERS)
export class FixerController {
  constructor(private readonly fixerFacade: FixerFacade) {}

  @Post()
  async fixEndpoint(@Req() request: FastifyRequest, @Body() dto: FixerDto) {
    const userId: number = CookieHelper.userIdCookie(request)
    const shopPrefix: string = ObfuscationHelper.decrypt(CookieHelper.obtainCookie(request, 'pfx'))

    const session: string = ObfuscationHelper.decrypt(CookieHelper.obtainCookie(request, 'ss'))
    await this.fixerFacade.fix(dto.type, { userId, shopPrefix, session })
  }
}
