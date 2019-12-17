import { Injectable } from '@nestjs/common'
import { ReportCreateDto } from './dto/ReportCreateDto'
import { IPaginationOptions } from 'nestjs-typeorm-paginate'
import { ReportService } from './ReportService'
import { ReportQueueFactory } from './ReportQueueFactory'
import { uniqueId } from 'lodash'
import { ReportGenerateReportProcessor } from './ReportGenerateReportProcessor'

@Injectable()
export class ReportFacade {
  constructor(
    private readonly service: ReportService,
    private readonly generateReportProcessor: ReportGenerateReportProcessor,
  ) {}

  fetchReports(request, options: IPaginationOptions) {
    return this.service.fetchReports(request, options)
  }

  fetchReport(id: number) {
    return this.service.fetchReport(id)
  }

  generateReport(dto: ReportCreateDto) {
    const queue = ReportQueueFactory.getQueue('generateReports', async (job, done) =>
      this.generateReportProcessor.process(done, job),
    )

    queue.add({ dto }, { jobId: uniqueId(), removeOnComplete: true, removeOnFail: true })
  }

  async fetchReportStatus(id) {
    const queue = ReportQueueFactory.getQueue('generateReports')
    const job = await queue.getJob(id)

    return job
  }

  fetchLatestReport(request) {
    return this.service.fetchLatestReport(request)
  }

  fetchPenultReport(request, id: number) {
    return this.service.fetchPenultReport(request, id)
  }
}
