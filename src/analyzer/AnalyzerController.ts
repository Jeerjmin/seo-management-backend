import { Controller, Param, Get, UseGuards } from '@nestjs/common'
import { ApiLayers } from 'infrastructure/constants/ApiLayers'
import { ShopifyAuthGuard } from 'auth/ShopifyAuthGuard'
import { AnalyzerFacade } from './AnalyzerFacade'

@Controller(ApiLayers.ANALYZER)
export class AnalyzerController {
  constructor(private readonly facade: AnalyzerFacade) {}

  @UseGuards(ShopifyAuthGuard)
  @Get(':type')
  fetchEndpoint(@Param('type') type: string) {
    return this.facade.handleFetch(type)
  }
}
