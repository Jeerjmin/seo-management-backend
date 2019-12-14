import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  Body,
  Post,
  UseGuards,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common'
import { ApiLayers } from 'infrastructure/constants/ApiLayers'
import { ReportFacade } from './ReportFacade'
import { ReportCreateDto } from './dto/ReportCreateDto'
import { ShopifyAuthGuard } from 'auth/ShopifyAuthGuard'
import { ReportDto } from './dto/ReportDto'
import { TransformInterceptor } from 'infrastructure/interceptor/TransformInterceptor'
import { ReportParamsValidator } from './ReportParamsValidator'

@UseGuards(ShopifyAuthGuard)
@Controller(ApiLayers.REPORT)
export class ReportController {
  constructor(private readonly facade: ReportFacade, private readonly paramsValidator: ReportParamsValidator) {}

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
    const isValid = this.paramsValidator.isValid(id)

    if (!isValid) {
      throw new BadRequestException()
    }

    return this.facade.fetchReport(id)
  }
}
