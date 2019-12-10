import { Controller, Get, Param, Query, Req, Body, Post } from '@nestjs/common'
import { ApiLayers } from 'infrastructure/constants/ApiLayers'
import { ReportFacade } from './ReportFacade'
import { ReportDto } from './dto/ReportDto'

@Controller(ApiLayers.REPORT)
export class ReportController {
  constructor(private readonly facade: ReportFacade) {}

  @Post('generate-report')
  generateReport(@Req() request, @Body() dto: ReportDto) {
    return this.facade.generateReport(request, dto)
  }

  @Get()
  fetchAll(@Req() request, @Query('page') page: number = 1, @Query('limit') limit: number = 15) {
    return this.facade.fetchReports(request, { limit, page })
  }

  @Get(':id')
  fetchReport(@Param('id') id: number) {
    return this.facade.fetchReport(id)
  }
}
