import { Injectable, HttpStatus } from '@nestjs/common'
import { ScanForBrokenLinksProcessor } from './ScanForBrokenLinksProcessor'
import { BrokenLinkQueueFactory } from './BrokenLinkQueueFactory'
import { Queues } from 'infrastructure/constants/Queues'
import { uniqueId } from 'lodash'
import { BrokenLinkService } from './BrokenLinkService'

@Injectable()
export class BrokenLinkFacade {
  constructor(
    private readonly scanForBrokenLinksProcessor: ScanForBrokenLinksProcessor,
    private readonly service: BrokenLinkService,
  ) {}

  async scanForBrokenLinks(response) {
    const queue = BrokenLinkQueueFactory.getQueue(Queues.SEARCH_BROKEN_LINKS, async (job, done) =>
      this.scanForBrokenLinksProcessor.process(done, job),
    )
    const jobId = uniqueId()

    queue.add({}, { jobId, removeOnComplete: true, removeOnFail: true })
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
