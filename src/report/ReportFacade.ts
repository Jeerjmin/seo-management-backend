import { Injectable, HttpStatus } from '@nestjs/common'
import { ReportCreateDto } from './dto/ReportCreateDto'
import { IPaginationOptions } from 'nestjs-typeorm-paginate'
import { ReportService } from './ReportService'
import { ReportQueueFactory } from './ReportQueueFactory'
import { uniqueId } from 'lodash'
import { FastifyReply, FastifyRequest } from 'fastify'
import { Http2ServerResponse } from 'http2'
import { Queues } from 'infrastructure/constants/Queues'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'
import { ObfuscationHelper } from 'infrastructure/helper/ObfuscationHelper'

@Injectable()
export class ReportFacade {
  constructor(private readonly service: ReportService) {}

  fetchReports(request, options: IPaginationOptions) {
    // todo
    return this.service.fetchReports(request, options)
  }

  fetchReport(id: number) {
    return this.service.fetchReport(id)
  }

  generateReport(dto: ReportCreateDto, request: FastifyRequest, response: FastifyReply<Http2ServerResponse>) {
    const queue = ReportQueueFactory.getQueue(Queues.GENERATE_REPORTS)
    const jobId = uniqueId()

    const session = ObfuscationHelper.decrypt(CookieHelper.obtainCookie(request, 'ss'))
    const shopPrefix = ObfuscationHelper.decrypt(CookieHelper.obtainCookie(request, 'pfx'))

    const userId = CookieHelper.userIdCookie(request)
    queue.add({ dto, session, shopPrefix, userId }, { jobId, removeOnComplete: true, removeOnFail: true })

    response
      .header('Location', `/reports/queue/${jobId}`)
      .status(HttpStatus.ACCEPTED)
      .send()
  }

  async fetchReportStatus(request, id: number) {
    // todo
    const queue = ReportQueueFactory.getQueue(Queues.GENERATE_REPORTS)
    const job = await queue.getJob(id)

    return job
      ? { status: 'processing', progress: job.progress() }
      : { ...(await this.fetchLatestReport(request)), progress: 1 }
  }

  fetchLatestReport(request) {
    //todo
    return this.service.fetchLatestReport(request)
  }

  fetchPenultReport(request, id: number) {
    //todo
    return this.service.fetchPenultReport(request, id)
  }
}
