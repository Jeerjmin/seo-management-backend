import { Processor } from 'infrastructure/queue/Processor'
import { AnalyzerFacade } from 'analyzer/AnalyzerFacade'
import { AnalyzerType } from 'analyzer/AnalyzerType'
import { BrokenLinksFormatterType } from 'analyzer/broken_links/BrokenLinksFormatterType'
import { BrokenLinkService } from './BrokenLinkService'
import { BrokenLinkScanType } from 'analyzer/broken_links/BrokenLinkScanType'

export class ScanForBrokenLinksProcessor implements Processor<Promise<any>> {
  constructor(private readonly analyzerFacade: AnalyzerFacade, private readonly service: BrokenLinkService) {}

  async process(done, job): Promise<any> {
    const {
      dto: { scanType: originalScanType },
      userId,
      shopPrefix,
    } = job.data
    const scanType: BrokenLinkScanType = BrokenLinkScanType[originalScanType] as BrokenLinkScanType

    job.progress(0.5)
    const results = await this.analyzerFacade.getResults(
      AnalyzerType.BROKEN_LINKS,
      BrokenLinksFormatterType.DEFAULT,
      undefined,
      { scanType, shopPrefix },
    )

    job.progress(1)
    return done(null, await this.service.save(userId, results))
  }
}
