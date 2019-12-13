import { Injectable } from '@nestjs/common'
import { AnalyzerFacade } from 'analyzer/AnalyzerFacade'
import { ReportDto } from './dto/ReportDto'
import { IPaginationOptions } from 'nestjs-typeorm-paginate'
import { ReportService } from './ReportService'
import { IssueFacade } from 'issue/IssueFacade'
import { AnalyzerType } from 'analyzer/AnalyzerType'
import { AltTagsFormatterType } from 'analyzer/alt_tags/AltTagsFormatterType'

@Injectable()
export class ReportFacade {
  constructor(
    private readonly analyzerFacade: AnalyzerFacade,
    private readonly service: ReportService,
    private readonly issueFacade: IssueFacade,
  ) {}

  fetchReports(request, options: IPaginationOptions) {
    return this.service.fetchReports(request, options)
  }

  fetchReport(id: number) {
    return this.service.fetchReport(id)
  }

  async generateReport(request, dto: ReportDto) {
    const altTagsAnalyzerResults = await this.analyzerFacade.getResults(
      AnalyzerType.ALT_TAGS,
      AltTagsFormatterType.OVERALL,
    )

    const overallFormatAltTags = await this.analyzerFacade.getResults(
      AnalyzerType.ALT_TAGS,
      AltTagsFormatterType.OVERALL,
      altTagsAnalyzerResults,
    )

    const unityFormatAltTags = await this.analyzerFacade.getResults(
      AnalyzerType.ALT_TAGS,
      AltTagsFormatterType.UNITY,
      altTagsAnalyzerResults,
    )

    await this.issueFacade.generateIssues(request, unityFormatAltTags)
    return this.service.generateReport(request, dto, overallFormatAltTags)
  }

  fetchLatestReport(request) {
    return this.service.fetchLatestReport(request)
  }

  fetchPenultReport(request, id: number) {
    return this.service.fetchPenultReport(request, id)
  }
}
