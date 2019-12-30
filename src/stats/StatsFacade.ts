import { StatsDto } from './StatsDto'
import { Injectable } from '@nestjs/common'
import { ReportFacade } from 'report/ReportFacade'
import { StatsService } from './StatsService'

@Injectable()
export class StatsFacade {
  constructor(private readonly reportFacade: ReportFacade, private readonly service: StatsService) {}

  async generateOverallStats(request): Promise<StatsDto> {
    const last = await this.reportFacade.fetchLatestReport(request)
    const penult = (await this.reportFacade.fetchPenultReport(request, last.id)) || last

    const accessibility = this.service.formatStats('accessibilityScore', last, penult)
    const performance = this.service.formatStats('performanceScore', last, penult)

    const bestPractices = this.service.formatStats('bestPracticesScore', last, penult)
    return new StatsDto(accessibility, performance, bestPractices)
  }
}
