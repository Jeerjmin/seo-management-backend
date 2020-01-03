import { Injectable, HttpStatus } from '@nestjs/common'
import { IssueService } from './IssueService'
import { IPaginationOptions } from 'nestjs-typeorm-paginate'
import { FixerFacade } from 'fixer/FixerFacade'
import { IssueQueueFactory } from './IssueQueueFactory'
import { Queues } from 'infrastructure/constants/Queues'
import { uniqueId } from 'lodash'
import { ObfuscationHelper } from 'infrastructure/helper/ObfuscationHelper'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'
import { FastifyRequest, FastifyReply } from 'fastify'
import { FixIssuesDto } from './dto/FixIssuesDto'

@Injectable()
export class IssueFacade {
  constructor(private readonly service: IssueService, private readonly fixerFacade: FixerFacade) {}

  generateIssues(userId: number, analyzerResults) {
    return this.service.generateIssues(userId, analyzerResults)
  }

  fetchIssues(request, options: IPaginationOptions, type: string) {
    return this.service.handleFetchIssues(request, options, type)
  }

  async fetchReportStatus(id: number) {
    const queue = IssueQueueFactory.getQueue(Queues.FIX_ISSUES)
    const job = await queue.getJob(id)

    return job ? { status: 'processing', progress: job.progress() } : { progress: 1 }
  }

  fixIssues(request: FastifyRequest, response: FastifyReply<any>, dto: FixIssuesDto) {
    const queue = IssueQueueFactory.getQueue(Queues.FIX_ISSUES)
    const jobId = uniqueId()

    const session = ObfuscationHelper.decrypt(CookieHelper.obtainCookie(request, 'ss'))
    const shopPrefix = ObfuscationHelper.decrypt(CookieHelper.obtainCookie(request, 'pfx'))

    const userId = CookieHelper.userIdCookie(request)
    queue.add({ dto, session, shopPrefix, userId }, { jobId, removeOnComplete: true, removeOnFail: true })

    response
      .header('Location', `/issues/queue/${jobId}`)
      .status(HttpStatus.ACCEPTED)
      .send()
  }
}
