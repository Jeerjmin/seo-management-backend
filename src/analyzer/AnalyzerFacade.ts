import { Injectable, Req } from '@nestjs/common'
import { AnalyzerService } from './AnalyzerService'
import { AnalyzerParams } from './params/AnalyzerParams'
import { AnalyzerReportDto } from './dto/AnalyzerReportDto'
import { UserFacade } from 'user/UserFacade'
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate'

@Injectable()
export class AnalyzerFacade {
  constructor(private readonly service: AnalyzerService, private readonly userFacade: UserFacade) {}

  handleFetch(params: AnalyzerParams): any {
    return this.service.handleFetch(params)
  }

  generateReport(@Req() request, dto: AnalyzerReportDto): object {
    const report = this.service.generateReport(request, dto)
    this.userFacade.completeOnboarding(request)

    return report
  }

  fetchLatestReport(@Req() request): any {
    return this.service.fetchLatestReport(request)
  }

  fetchPenultReport(@Req() request, lastId: number): any {
    return this.service.fetchPenultReport(request, lastId)
  }

  fetchReports(request, options: IPaginationOptions): Promise<Pagination<any>> {
    return this.service.fetchReports(request, options)
  }
}
