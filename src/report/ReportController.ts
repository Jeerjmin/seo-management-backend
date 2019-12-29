import { Controller, Get, Param, Query, Req, Body, Post, UseGuards, UseInterceptors, Res } from '@nestjs/common'
import { ApiLayers } from 'infrastructure/constants/ApiLayers'
import { ReportFacade } from './ReportFacade'
import { ReportCreateDto } from './dto/ReportCreateDto'
import { ShopifyAuthGuard } from 'auth/ShopifyAuthGuard'
import { ReportDto } from './dto/ReportDto'
import { TransformInterceptor } from 'infrastructure/interceptor/TransformInterceptor'
import { FastifyReply, FastifyRequest } from 'fastify'
import { Http2ServerResponse } from 'http2'

@UseGuards(ShopifyAuthGuard)
@Controller(ApiLayers.REPORT)
export class ReportController {
  constructor(private readonly facade: ReportFacade) {}

  @Post('generate-report')
  generateReport(
    @Body() dto: ReportCreateDto,
    @Req() request: FastifyRequest,
    @Res() response: FastifyReply<Http2ServerResponse>,
  ) {
    return this.facade.generateReport(dto, request, response)
  }

  @Get()
  fetchAll(@Req() request, @Query('page') page: number = 1, @Query('limit') limit: number = 15) {
    return this.facade.fetchReports(request, { limit, page })
  }

  @Get('queue/:id')
  async fetchReportStatus(@Req() request, @Param('id') id: number) {
    return this.facade.fetchReportStatus(request, id)
  }

  @Get(':id')
  @UseInterceptors(new TransformInterceptor(ReportDto))
  fetchReport(@Param('id') id: number): Promise<ReportDto> {
    return this.facade.fetchReport(id)
  }
}
