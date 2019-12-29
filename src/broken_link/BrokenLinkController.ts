import { Controller, Post, Res, Req, Param, Get, Body } from '@nestjs/common'
import { ApiLayers } from 'infrastructure/constants/ApiLayers'
import { BrokenLinkFacade } from './BrokenLinkFacade'
import { ScanForBrokenLinksDto } from './dto/ScanForBrokenLinksDto'
import { FastifyRequest, FastifyReply } from 'fastify'
import { Http2ServerResponse } from 'http2'

@Controller(ApiLayers.BROKEN_LINKS)
export class BrokenLinkController {
  constructor(private readonly facade: BrokenLinkFacade) {}

  @Post('scan')
  async scanEndpoint(
    @Req() request: FastifyRequest,
    @Res() response: FastifyReply<Http2ServerResponse>,
    @Body() dto: ScanForBrokenLinksDto,
  ) {
    return this.facade.scanForBrokenLinks(request, response, dto)
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
