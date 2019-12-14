import { AnalyzerFacade } from 'analyzer/AnalyzerFacade'
import { StatsDto } from './StatsDto'
import { Injectable } from '@nestjs/common'
import * as moment from 'moment'
import { ReportFacade } from 'report/ReportFacade'

@Injectable()
export class StatsFacade {
  constructor(private readonly reportFacade: ReportFacade) {}

  async generateOverallStats(request): Promise<StatsDto> {
    const last = await this.reportFacade.fetchLatestReport(request)
    let penult = last

    if (last) {
      penult = (await this.reportFacade.fetchPenultReport(request, last.id)) || last
    }

    const accessibility = this.formatStats('accessibilityScore', last, penult)
    const performance = this.formatStats('performanceScore', last, penult)
    const bestPractices = this.formatStats('bestPracticesScore', last, penult)

    return new StatsDto(accessibility, performance, bestPractices)
  }

  private formatStats(feature, last, penult) {
    return last
      ? {
          value: last.details[feature] || 'N/A',
          lastValue: penult.details[feature] || 'N/A',
          createdAt: this.formatDate(last.createdAt),
        }
      : {
          value: 'N/A',
          lastValue: 'N/A',
          createdAt: 'Never',
        }
  }

  private formatDate(input?) {
    return moment(input).format('MM/DD/YYYY')
  }
}
