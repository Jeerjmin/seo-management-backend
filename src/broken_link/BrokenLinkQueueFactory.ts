import * as Queue from 'bull'
import { AbstractQueueFactory } from 'infrastructure/queue/AbstractQueueFactory'
import { Queues } from 'infrastructure/constants/Queues'

export class BrokenLinkQueueFactory extends AbstractQueueFactory {
  static initialize() {
    this.registerQueue(Queues.SEARCH_BROKEN_LINKS, new Queue(Queues.SEARCH_BROKEN_LINKS, this.QUEUE_CONFIG))
  }
}

BrokenLinkQueueFactory.initialize()
