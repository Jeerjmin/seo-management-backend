import { Controller, Get, UseGuards, Query, Body, Post } from '@nestjs/common'
import { ApiLayers } from 'infrastructure/constants/ApiLayers'
import { ShopifyAuthGuard } from 'auth/ShopifyAuthGuard'
import { AnalyzerFacade } from './AnalyzerFacade'
import { AnalyzerParams } from './params/AnalyzerParams'
import { AnalyzerRaportDto } from './dto/AnalyzerRaportDto'

@Controller(ApiLayers.ANALYZERS)
export class AnalyzerController {
  constructor(private readonly facade: AnalyzerFacade) {}

  @UseGuards(ShopifyAuthGuard)
  @Get()
  fetchEndpoint(@Query() params: AnalyzerParams) {
    return this.facade.handleFetch(params)
  }

  @UseGuards(ShopifyAuthGuard)
  @Post('generate-raport')
  generateRaport(@Body() dto: AnalyzerRaportDto) {
    return this.facade.generateRaport(dto)
  }
}
