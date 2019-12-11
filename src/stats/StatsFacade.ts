import { AnalyzerFacade } from 'analyzer/AnalyzerFacade'
import { StatsDto } from './StatsDto'
import { Injectable } from '@nestjs/common'
import * as moment from 'moment'
import { ReportFacade } from 'report/ReportFacade'

@Injectable()
export class StatsFacade {
  constructor(private readonly reportFacade: ReportFacade) {}

  async generateOverallStats(request): Promise<StatsDto> {
    const accessibility = await this.fetchAccessibilityStats(request)
    const performance = this.fetchPerformanceStats()
    const seo = this.fetchSeoStats()

    return new StatsDto(accessibility, performance, seo)
  }

  private async fetchAccessibilityStats(request) {
    const last = await this.reportFacade.fetchLatestReport(request)

    if (last) {
      const penult = (await this.reportFacade.fetchPenultReport(request, last.id)) || last

      return {
        value: last.details[0].overallFilledAltTagsPercent,
        lastValue: penult.details[0].overallFilledAltTagsPercent,
        createdAt: this.formatDate(last.createdAt),
      }
    }

    return {
      value: 'N/A',
      lastValue: 'N/A',
      createdAt: 'Never',
    }
  }

  private fetchPerformanceStats() {
    return { value: 'N/A', lastValue: 'N/A', createdAt: 'Never' }
  }

  private fetchSeoStats() {
    return { value: 'N/A', lastValue: 'N/A', createdAt: 'Never' }
  }

  private formatDate(input?) {
    return moment(input).format('MM/DD/YYYY')
  }
}
