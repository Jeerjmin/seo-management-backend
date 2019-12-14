import { Controller, Get, Param, Query, Req, Body, Post, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiLayers } from 'infrastructure/constants/ApiLayers'
import { ReportFacade } from './ReportFacade'
import { ReportCreateDto } from './dto/ReportCreateDto'
import { ShopifyAuthGuard } from 'auth/ShopifyAuthGuard'
import { ReportDto } from './dto/ReportDto'
import { TransformInterceptor } from 'infrastructure/interceptor/TransformInterceptor'

@UseGuards(ShopifyAuthGuard)
@Controller(ApiLayers.REPORT)
export class ReportController {
  constructor(private readonly facade: ReportFacade) {}

  @Post('generate-report')
  generateReport(@Req() request, @Body() dto: ReportCreateDto) {
    return this.facade.generateReport(request, dto)
  }

  @Get()
  fetchAll(@Req() request, @Query('page') page: number = 1, @Query('limit') limit: number = 15) {
    return this.facade.fetchReports(request, { limit, page })
  }

  @Get(':id')
  @UseInterceptors(new TransformInterceptor(ReportDto))
  fetchReport(@Param('id') id: number): Promise<ReportDto> {
    return this.facade.fetchReport(id)
  }
}
