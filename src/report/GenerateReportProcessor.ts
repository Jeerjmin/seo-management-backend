import { Processor } from 'infrastructure/queue/Processor'
import { AnalyzerType } from 'analyzer/AnalyzerType'
import { AltTagsFormatterType } from 'analyzer/alt_tags/AltTagsFormatterType'
import { AnalyzerFacade } from 'analyzer/AnalyzerFacade'
import { IssueFacade } from 'issue/IssueFacade'
import { findIndex } from 'lodash'
import { ReportService } from './ReportService'
import { UserFacade } from 'user/UserFacade'
import { AppsFormatterType } from 'analyzer/apps/AppsFormatterType'

export class GenerateReportProcessor implements Processor<Promise<any>> {
  constructor(
    private readonly analyzerFacade: AnalyzerFacade,
    private readonly userFacade: UserFacade,
    private readonly issueFacade: IssueFacade,
    private readonly reportService: ReportService,
  ) {}

  async process(done, job): Promise<any> {
    const {
      dto: { options },
      userId,
      session,
      shopPrefix,
    } = job.data

    let reportResults = {}
    const altTagsIndex = findIndex(options, _ => _ === AnalyzerType.ALT_TAGS)

    if (altTagsIndex !== -1) {
      job.progress(0.1)
      const altTagsAnalyzerResults = await this.analyzerFacade.getResults(
        AnalyzerType.ALT_TAGS,
        AltTagsFormatterType.DEFAULT,
        undefined,
        { session, shopPrefix, userId },
      )

      job.progress(0.2)
      const overallFormatAltTags = await this.analyzerFacade.getResults(
        AnalyzerType.ALT_TAGS,
        AltTagsFormatterType.OVERALL,
        altTagsAnalyzerResults,
        { session, shopPrefix, userId },
      )

      job.progress(0.3)
      reportResults = { ...reportResults, ...overallFormatAltTags }

      const unityFormatAltTags = await this.analyzerFacade.getResults(
        AnalyzerType.ALT_TAGS,
        AltTagsFormatterType.UNITY,
        altTagsAnalyzerResults,
        { session, shopPrefix, userId },
      )
      job.progress(0.4)

      await this.issueFacade.generateIssues(userId, unityFormatAltTags)
      job.progress(0.5)
    }

    job.progress(0.6)
    for (const optionIndex in options) {
      const option = options[optionIndex]
      if (option === AnalyzerType.ALT_TAGS) {
        continue
      }

      const type: AnalyzerType = AnalyzerType[option] as AnalyzerType
      const analyzerResults = await this.analyzerFacade.getResults(type, 'DEFAULT', undefined, {
        session,
        shopPrefix,
        userId,
      })

      reportResults = { ...reportResults, ...analyzerResults }
      job.progress(0.7)
    }

    job.progress(0.8)
    await this.userFacade.completeOnboarding(userId)

    const { apps } = await this.analyzerFacade.getResults(AnalyzerType.APPS, AppsFormatterType.DEFAULT, undefined, {
      session,
      shopPrefix,
      userId,
    })
    job.progress(0.9)

    await this.userFacade.saveAppsList(userId, apps)
    job.progress(1)

    return done(null, await this.reportService.generateReport(userId, reportResults))
  }
}
