import { Injectable, OnModuleInit } from '@nestjs/common'
import { AnalyzerFacade } from 'analyzer/AnalyzerFacade'
import { UserFacade } from 'user/UserFacade'
import { IssueFacade } from 'issue/IssueFacade'
import { ReportService } from './ReportService'
import { ReportQueueFactory } from './ReportQueueFactory'
import { Queues } from 'infrastructure/constants/Queues'
import { GenerateReportProcessor } from './GenerateReportProcessor'
import * as Queue from 'bull'

@Injectable()
export class ModuleInitEventListener implements OnModuleInit {
  constructor(
    private readonly analyzerFacade: AnalyzerFacade,
    private readonly userFacade: UserFacade,
    private readonly issueFacade: IssueFacade,
    private readonly reportService: ReportService,
  ) {}

  onModuleInit() {
    const generateReportProcessor = new GenerateReportProcessor(
      this.analyzerFacade,
      this.userFacade,
      this.issueFacade,
      this.reportService,
    )

    ReportQueueFactory.registerQueues({
      name: Queues.GENERATE_REPORTS,
      queue: new Queue(Queues.GENERATE_REPORTS, ReportQueueFactory.QUEUE_CONFIG),
      processor: async (job, done) => generateReportProcessor.process(done, job),
    })
  }
}
