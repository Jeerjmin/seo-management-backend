import { AbstractQueueFactory } from 'infrastructure/queue/AbstractQueueFactory'

export class BrokenLinkQueueFactory extends AbstractQueueFactory {
  // this.registerQueue(Queues.SEARCH_BROKEN_LINKS, new Queue(Queues.SEARCH_BROKEN_LINKS, this.QUEUE_CONFIG))
}
