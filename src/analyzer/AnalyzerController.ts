import { Controller, Get, UseGuards, Query } from '@nestjs/common'
import { ApiLayers } from 'infrastructure/constants/ApiLayers'
import { ShopifyAuthGuard } from 'auth/ShopifyAuthGuard'
import { AnalyzerFacade } from './AnalyzerFacade'
import { AnalyzerParams } from './params/AnalyzerParams'

@UseGuards(ShopifyAuthGuard)
@Controller(ApiLayers.ANALYZERS)
export class AnalyzerController {
  constructor(private readonly facade: AnalyzerFacade) {}

  @Get()
  async fetchEndpoint(@Query() params: AnalyzerParams) {
    return this.facade.getResults(params.type, params.format, undefined, {}, params.fields)
  }
}
