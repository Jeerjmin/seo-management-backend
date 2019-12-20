import { Injectable, Inject } from '@nestjs/common'
import { Processor } from 'infrastructure/queue/Processor'
import { AnalyzerType } from 'analyzer/AnalyzerType'
import { AltTagsFormatterType } from 'analyzer/alt_tags/AltTagsFormatterType'
import { AnalyzerFacade } from 'analyzer/AnalyzerFacade'
import { IssueFacade } from 'issue/IssueFacade'
import { findIndex } from 'lodash'
import { ReportService } from './ReportService'
import { UserFacade } from 'user/UserFacade'
import { REQUEST } from '@nestjs/core'
import { AppsFormatterType } from 'analyzer/apps/AppsFormatterType'

@Injectable()
export class ReportGenerateReportProcessor implements Processor<Promise<any>> {
  constructor(
    @Inject(REQUEST) private readonly request,
    private readonly analyzerFacade: AnalyzerFacade,
    private readonly userFacade: UserFacade,
    private readonly issueFacade: IssueFacade,
    private readonly reportService: ReportService,
  ) {}

  async process(done, job): Promise<any> {
    const {
      dto: { options },
    } = job.data

    let reportResults = {}
    const altTagsIndex = findIndex(options, _ => _ === AnalyzerType.ALT_TAGS)

    if (altTagsIndex !== -1) {
      job.progress(0.1)
      const altTagsAnalyzerResults = await this.analyzerFacade.getResults(
        AnalyzerType.ALT_TAGS,
        AltTagsFormatterType.DEFAULT,
      )

      job.progress(0.2)
      const overallFormatAltTags = await this.analyzerFacade.getResults(
        AnalyzerType.ALT_TAGS,
        AltTagsFormatterType.OVERALL,
        altTagsAnalyzerResults,
      )

      job.progress(0.3)
      reportResults = { ...reportResults, ...overallFormatAltTags }

      const unityFormatAltTags = await this.analyzerFacade.getResults(
        AnalyzerType.ALT_TAGS,
        AltTagsFormatterType.UNITY,
        altTagsAnalyzerResults,
      )
      job.progress(0.4)

      await this.issueFacade.generateIssues(this.request, unityFormatAltTags)
      job.progress(0.5)
    }

    job.progress(0.6)
    for (const optionIndex in options) {
      const option = options[optionIndex]
      if (option === AnalyzerType.ALT_TAGS) {
        continue
      }

      const type: AnalyzerType = AnalyzerType[option] as AnalyzerType
      const analyzerResults = await this.analyzerFacade.getResults(type, 'DEFAULT')

      reportResults = { ...reportResults, ...analyzerResults }
      job.progress(0.7)
    }

    job.progress(0.8)
    await this.userFacade.completeOnboarding(this.request)

    const { apps } = await this.analyzerFacade.getResults(AnalyzerType.APPS, AppsFormatterType.DEFAULT)
    job.progress(0.9)

    await this.userFacade.saveAppsList(this.request, apps)
    job.progress(1)

    return done(null, await this.reportService.generateReport(this.request, reportResults))
  }
}
