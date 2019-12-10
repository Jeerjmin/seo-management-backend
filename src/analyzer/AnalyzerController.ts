import { Controller, Get, UseGuards, Query, Body, Post, Req, Param } from '@nestjs/common'
import { ApiLayers } from 'infrastructure/constants/ApiLayers'
import { ShopifyAuthGuard } from 'auth/ShopifyAuthGuard'
import { AnalyzerFacade } from './AnalyzerFacade'
import { AnalyzerParams } from './params/AnalyzerParams'
import { AnalyzerReportDto } from './dto/AnalyzerReportDto'

@UseGuards(ShopifyAuthGuard)
@Controller(ApiLayers.ANALYZERS)
export class AnalyzerController {
  constructor(private readonly facade: AnalyzerFacade) {}

  @Get()
  fetchEndpoint(@Query() params: AnalyzerParams) {
    return this.facade.handleFetch(params)
  }

  @Post('generate-report')
  generateReport(@Req() request, @Body() dto: AnalyzerReportDto) {
    return this.facade.generateReport(request, dto)
  }

  @Get('reports')
  fetchLatest(@Req() request, @Query('page') page: number = 1, @Query('limit') limit: number = 15) {
    return this.facade.fetchReports(request, { limit, page })
  }

  @Get('reports/:id')
  fetchReport(@Param('id') id: number) {
    return this.facade.fetchReport(id)
  }
}
