import { OnModuleInit, Injectable } from '@nestjs/common'
import { Queues } from 'infrastructure/constants/Queues'
import * as Queue from 'bull'
import { BrokenLinkQueueFactory } from './BrokenLinkQueueFactory'
import { ScanForBrokenLinksProcessor } from './ScanForBrokenLinksProcessor'
import { BrokenLinkService } from './BrokenLinkService'
import { AnalyzerFacade } from 'analyzer/AnalyzerFacade'

@Injectable()
export class ModuleInitEventListener implements OnModuleInit {
  constructor(private readonly analyzerFacade: AnalyzerFacade, private readonly service: BrokenLinkService) {}

  onModuleInit() {
    const scanForBrokenLinksProcessor = new ScanForBrokenLinksProcessor(this.analyzerFacade, this.service)

    BrokenLinkQueueFactory.registerQueues({
      name: Queues.SEARCH_BROKEN_LINKS,
      queue: new Queue(Queues.SEARCH_BROKEN_LINKS, BrokenLinkQueueFactory.QUEUE_CONFIG),
      processor: async (job, done) => scanForBrokenLinksProcessor.process(done, job),
    })
  }
}
