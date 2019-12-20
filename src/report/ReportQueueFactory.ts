import * as Queue from 'bull'
import { AbstractQueueFactory } from 'infrastructure/queue/AbstractQueueFactory'
import { Queues } from 'infrastructure/constants/Queues'

export class ReportQueueFactory extends AbstractQueueFactory {
  static initialize() {
    this.registerQueue(Queues.GENERATE_REPORTS, new Queue(Queues.GENERATE_REPORTS, this.QUEUE_CONFIG))
  }
}

ReportQueueFactory.initialize()
