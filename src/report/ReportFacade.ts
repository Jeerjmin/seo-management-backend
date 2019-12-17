import { Injectable, HttpStatus } from '@nestjs/common'
import { ReportCreateDto } from './dto/ReportCreateDto'
import { IPaginationOptions } from 'nestjs-typeorm-paginate'
import { ReportService } from './ReportService'
import { ReportQueueFactory } from './ReportQueueFactory'
import { uniqueId } from 'lodash'
import { ReportGenerateReportProcessor } from './ReportGenerateReportProcessor'
import { FastifyReply } from 'fastify'
import { Http2ServerResponse } from 'http2'
import { Queues } from 'infrastructure/constants/Queues'

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

  generateReport(dto: ReportCreateDto, response: FastifyReply<Http2ServerResponse>) {
    const queue = ReportQueueFactory.getQueue(Queues.GENERATE_REPORTS, async (job, done) =>
      this.generateReportProcessor.process(done, job),
    )
    const jobId = uniqueId()

    queue.add({ dto }, { jobId, removeOnComplete: true, removeOnFail: true })
    response
      .header('Location', `/reports/queue/${jobId}`)
      .status(HttpStatus.ACCEPTED)
      .send()
  }

  async fetchReportStatus(request, id: number) {
    const queue = ReportQueueFactory.getQueue(Queues.GENERATE_REPORTS)
    const job = await queue.getJob(id)

    return job
      ? { status: 'processing', progress: job.progress() }
      : { ...(await this.fetchLatestReport(request)), progress: 1 }
  }

  fetchLatestReport(request) {
    return this.service.fetchLatestReport(request)
  }

  fetchPenultReport(request, id: number) {
    return this.service.fetchPenultReport(request, id)
  }
}
