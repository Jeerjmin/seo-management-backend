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

  fetchReports(userId: number, options: IPaginationOptions) {
    return this.service.fetchReports(userId, options)
  }

  fetchReport(id: number) {
    return this.service.fetchReport(id)
  }

  generateReport(dto: ReportCreateDto, request: FastifyRequest, response: FastifyReply<Http2ServerResponse>) {
    const queue = ReportQueueFactory.getQueue(Queues.GENERATE_REPORTS)
    const jobId = uniqueId()

    const session: string = ObfuscationHelper.decrypt(CookieHelper.obtainCookie(request, 'ss'))
    const shopPrefix: string = ObfuscationHelper.decrypt(CookieHelper.obtainCookie(request, 'pfx'))

    const userId: number = CookieHelper.userIdCookie(request)
    queue.add({ dto, session, shopPrefix, userId }, { jobId, removeOnComplete: true, removeOnFail: true })

    response
      .header('Location', `/reports/queue/${jobId}`)
      .status(HttpStatus.ACCEPTED)
      .send()
  }

  async fetchReportStatus(userId: number, id: number) {
    const queue = ReportQueueFactory.getQueue(Queues.GENERATE_REPORTS)
    const job = await queue.getJob(id)

    return job
      ? { status: 'processing', progress: job.progress() }
      : { ...(await this.fetchLatestReport(userId)), progress: 1 }
  }

  fetchLatestReport(userId: number) {
    return this.service.fetchLatestReport(userId)
  }

  fetchPenultReport(userId: number, id: number) {
    return this.service.fetchPenultReport(userId, id)
  }
}
