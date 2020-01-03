import { Injectable, OnModuleInit } from '@nestjs/common'
import { IssueQueueFactory } from './IssueQueueFactory'
import * as Queue from 'bull'
import { Queues } from 'infrastructure/constants/Queues'
import { FixIssuesProcessor } from './FixIssuesProcessor'
import { FixerFacade } from 'fixer/FixerFacade'

@Injectable()
export class ModuleInitEventListener implements OnModuleInit {
  constructor(private readonly fixerFacade: FixerFacade) {}

  onModuleInit() {
    const fixIssuesProcessor: FixIssuesProcessor = new FixIssuesProcessor(this.fixerFacade)

    IssueQueueFactory.registerQueues({
      name: Queues.FIX_ISSUES,
      queue: new Queue(Queues.FIX_ISSUES, IssueQueueFactory.QUEUE_CONFIG),
      processor: async (job, done) => fixIssuesProcessor.process(done, job),
    })
  }
}
