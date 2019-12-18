import { Controller, Post, Res, Req, Param, Get } from '@nestjs/common'
import { ApiLayers } from 'infrastructure/constants/ApiLayers'
import { BrokenLinkFacade } from './BrokenLinkFacade'

@Controller(ApiLayers.BROKEN_LINKS)
export class BrokenLinkController {
  constructor(private readonly facade: BrokenLinkFacade) {}

  @Post('scan')
  async scanEndpoint(@Res() response) {
    return this.facade.scanForBrokenLinks(response)
  }

  @Get('queue/:id')
  async fetchQueueStatusEndpoint(@Req() request, @Param('id') id: number) {
    return this.facade.fetchBrokenLinkQueueStatus(request, id)
  }

  @Get()
  async fetchEndpoint(@Req() request) {
    return this.facade.fetchLatest(request)
  }
}
