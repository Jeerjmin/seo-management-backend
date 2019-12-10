import { AnalyzerFacade } from 'analyzer/AnalyzerFacade'
import { StatsDto } from './StatsDto'
import { Injectable } from '@nestjs/common'
import * as moment from 'moment'

@Injectable()
export class StatsFacade {
  constructor(private readonly analyzerFacade: AnalyzerFacade) {}

  async generateOverallStats(request): Promise<StatsDto> {
    const accessibility = await this.fetchAccessibilityStats(request)
    const performance = this.fetchPerformanceStats()
    const seo = this.fetchSeoStats()

    return new StatsDto(accessibility, performance, seo)
  }

  private async fetchAccessibilityStats(request) {
    const last = await this.analyzerFacade.fetchLatestReport(request)

    if (last) {
      const penult = (await this.analyzerFacade.fetchPenultReport(request, last.id)) || last
      return {
        value: last.details[0].filledAltTagsPercent,
        lastValue: penult.details[0].filledAltTagsPercent,
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
