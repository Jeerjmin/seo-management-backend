import { Injectable } from '@nestjs/common'
import * as moment from 'moment'
import { ReportFacade } from 'report/ReportFacade'
import { ReportDto } from 'report/dto/ReportDto'
import { StatsDto } from './StatsDto'

@Injectable()
export class StatsService {
  constructor(private readonly reportFacade: ReportFacade) {}

  async generateOverallStats(userId: number): Promise<StatsDto> {
    const lastReport = await this.getLastReport(userId)
    const penultReport = await this.getPenultReport(userId, lastReport)

    const accessibility = this.transformToStatsFormat('accessibilityScore', lastReport, penultReport)
    const performance = this.transformToStatsFormat('performanceScore', lastReport, penultReport)

    const bestPractices = this.transformToStatsFormat('bestPracticesScore', lastReport, penultReport)
    return new StatsDto(accessibility, performance, bestPractices)
  }

  private transformToStatsFormat(feature: string, lastReport: ReportDto, penultReport: ReportDto) {
    return lastReport
      ? {
          value: lastReport.details[feature] || 'N/A',
          lastValue: this.isPenultReportExist(penultReport, feature) ? penultReport.details[feature] : 'N/A',
          createdAt: this.formatDate(lastReport.createdAt),
        }
      : { value: 'N/A', lastValue: 'N/A', createdAt: 'Never' }
  }

  private isPenultReportExist(penultReport: ReportDto, property: string) {
    return penultReport && penultReport.details && penultReport.details[property]
  }

  private async getLastReport(userId: number): Promise<ReportDto> {
    return this.reportFacade.fetchLatestReport(userId)
  }

  private async getPenultReport(userId: number, lastReport: ReportDto): Promise<ReportDto> {
    return lastReport ? (await this.reportFacade.fetchPenultReport(userId, lastReport.id)) || lastReport : lastReport
  }

  private formatDate(input?): string {
    return moment(input).format('MM/DD/YYYY')
  }
}
