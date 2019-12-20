import { Injectable, Inject } from '@nestjs/common'
import { Processor } from 'infrastructure/queue/Processor'
import { AnalyzerFacade } from 'analyzer/AnalyzerFacade'
import { AnalyzerType } from 'analyzer/AnalyzerType'
import { BrokenLinksFormatterType } from 'analyzer/broken_links/BrokenLinksFormatterType'
import { BrokenLinkService } from './BrokenLinkService'
import { REQUEST } from '@nestjs/core'
import { BrokenLinkScanType } from 'analyzer/broken_links/BrokenLinkScanType'

@Injectable()
export class ScanForBrokenLinksProcessor implements Processor<Promise<any>> {
  constructor(
    @Inject(REQUEST) private readonly request,
    private readonly analyzerFacade: AnalyzerFacade,
    private readonly service: BrokenLinkService,
  ) {}

  async process(done, job): Promise<any> {
    const scanType: BrokenLinkScanType = BrokenLinkScanType[job.data.dto.scanType] as BrokenLinkScanType
    job.progress(0.5)

    const results = await this.analyzerFacade.getResults(
      AnalyzerType.BROKEN_LINKS,
      BrokenLinksFormatterType.DEFAULT,
      undefined,
      [{ scanType }],
    )
    job.progress(1)

    return done(null, await this.service.save(this.request, results))
  }
}
