import { Injectable, Req } from '@nestjs/common'
import { AnalyzerService } from './AnalyzerService'
import { AnalyzerParams } from './params/AnalyzerParams'
import { AnalyzerReportDto } from './dto/AnalyzerReportDto'
import { UserFacade } from 'user/UserFacade'

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

  fetchLatestReport(@Req() request): object {
    return this.service.fetchLatestReport(request)
  }
}
