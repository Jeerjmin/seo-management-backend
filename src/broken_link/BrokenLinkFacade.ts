import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common'
import { BrokenLinkQueueFactory } from './BrokenLinkQueueFactory'
import { Queues } from 'infrastructure/constants/Queues'
import { uniqueId } from 'lodash'
import { BrokenLinkService } from './BrokenLinkService'
import { ScanForBrokenLinksDto } from './dto/ScanForBrokenLinksDto'
import { BrokenLinkScanTypeValidator } from './BrokenLinkScanTypeValidator'
import { FastifyReply, FastifyRequest } from 'fastify'
import { Http2ServerResponse } from 'http2'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'
import { ObfuscationHelper } from 'infrastructure/helper/ObfuscationHelper'

@Injectable()
export class BrokenLinkFacade {
  constructor(
    private readonly service: BrokenLinkService,
    private readonly scanTypeValidator: BrokenLinkScanTypeValidator,
  ) {}

  async scanForBrokenLinks(
    request: FastifyRequest,
    response: FastifyReply<Http2ServerResponse>,
    dto: ScanForBrokenLinksDto,
  ) {
    if (!this.scanTypeValidator.isValid(dto.scanType)) {
      throw new BadRequestException()
    }
    const queue = BrokenLinkQueueFactory.getQueue(Queues.SEARCH_BROKEN_LINKS)
    const jobId = uniqueId()

    const shopPrefix = ObfuscationHelper.decrypt(CookieHelper.obtainCookie(request, 'pfx'))
    const userId = CookieHelper.userIdCookie(request)

    queue.add({ dto, userId, shopPrefix }, { jobId, removeOnComplete: true, removeOnFail: true })

    response
      .header('Location', `/broken-links/queue/${jobId}`)
      .status(HttpStatus.ACCEPTED)
      .send()
  }

  async fetchLatest(request) {
    return this.service.fetchLatest(request)
  }

  async fetchBrokenLinkQueueStatus(request, id: number) {
    const queue = BrokenLinkQueueFactory.getQueue(Queues.SEARCH_BROKEN_LINKS)
    const job = await queue.getJob(id)

    return job
      ? { status: 'processing', progress: job.progress() }
      : { ...(await this.service.fetchLatest(request)), progress: 1 }
  }
}
