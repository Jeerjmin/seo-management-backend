import { Injectable } from '@nestjs/common'
import { AnalyzerFacade } from 'analyzer/AnalyzerFacade'
import { ReportCreateDto } from './dto/ReportCreateDto'
import { IPaginationOptions } from 'nestjs-typeorm-paginate'
import { ReportService } from './ReportService'
import { IssueFacade } from 'issue/IssueFacade'
import { AnalyzerType } from 'analyzer/AnalyzerType'
import { AltTagsFormatterType } from 'analyzer/alt_tags/AltTagsFormatterType'
import { UserFacade } from 'user/UserFacade'
import { findIndex } from 'lodash'

@Injectable()
export class ReportFacade {
  constructor(
    private readonly analyzerFacade: AnalyzerFacade,
    private readonly service: ReportService,
    private readonly issueFacade: IssueFacade,
    private readonly userFacade: UserFacade,
  ) {}

  fetchReports(request, options: IPaginationOptions) {
    return this.service.fetchReports(request, options)
  }

  fetchReport(id: number) {
    return this.service.fetchReport(id)
  }

  async generateReport(request, dto: ReportCreateDto) {
    const altTagsIndex = findIndex(dto.options, _ => _ === AnalyzerType.ALT_TAGS)
    let reportResults = {}

    if (altTagsIndex !== -1) {
      const altTagsAnalyzerResults = await this.analyzerFacade.getResults(
        AnalyzerType.ALT_TAGS,
        AltTagsFormatterType.DEFAULT,
      )

      const overallFormatAltTags = await this.analyzerFacade.getResults(
        AnalyzerType.ALT_TAGS,
        AltTagsFormatterType.OVERALL,
        altTagsAnalyzerResults,
      )

      reportResults = { ...reportResults, ...overallFormatAltTags }

      const unityFormatAltTags = await this.analyzerFacade.getResults(
        AnalyzerType.ALT_TAGS,
        AltTagsFormatterType.UNITY,
        altTagsAnalyzerResults,
      )

      await this.issueFacade.generateIssues(request, unityFormatAltTags)
    }

    // tslint:disable-next-line: forin
    for (const optionIndex in dto.options) {
      const option = dto.options[optionIndex]
      if (option === AnalyzerType.ALT_TAGS) continue

      const type: AnalyzerType = AnalyzerType[option] as AnalyzerType
      const analyzerResults = await this.analyzerFacade.getResults(type, 'DEFAULT')

      reportResults = { ...reportResults, ...analyzerResults }
    }

    await this.userFacade.completeOnboarding(request)
    return this.service.generateReport(request, reportResults)
  }

  fetchLatestReport(request) {
    return this.service.fetchLatestReport(request)
  }

  fetchPenultReport(request, id: number) {
    return this.service.fetchPenultReport(request, id)
  }
}
