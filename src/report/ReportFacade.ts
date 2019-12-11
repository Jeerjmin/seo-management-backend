import { Injectable } from '@nestjs/common'
import { AnalyzerFacade } from 'analyzer/AnalyzerFacade'
import { ReportDto } from './dto/ReportDto'
import { IPaginationOptions } from 'nestjs-typeorm-paginate'
import { ReportService } from './ReportService'
import { IssueFacade } from 'issue/IssueFacade'
import { AnalyzerType } from 'analyzer/AnalyzerType'

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
    const altTagsAnalyzerResults = await this.analyzerFacade.compute({
      type: AnalyzerType.ALT_TAGS,
      fields:
        'products,pages,articles,customCollections,smartCollections,overallAltTagsCount,overallFilledAltTagsCount,overallFilledAltTagsPercent',
    })

    await this.issueFacade.generateIssues(request, altTagsAnalyzerResults)
    return this.service.generateReport(request, dto, altTagsAnalyzerResults)
  }

  fetchLatestReport(request) {
    return this.service.fetchLatestReport(request)
  }

  fetchPenultReport(request, id: number) {
    return this.service.fetchPenultReport(request, id)
  }
}
