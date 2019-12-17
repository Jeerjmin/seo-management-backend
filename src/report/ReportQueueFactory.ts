import * as Queue from 'bull'
import { AbstractQueueFactory } from 'infrastructure/queue/AbstractQueueFactory'

export class ReportQueueFactory extends AbstractQueueFactory {
  static initialize() {
    this.registerQueue('generateReports', new Queue('generateReports', this.QUEUE_CONFIG))
  }
}

ReportQueueFactory.initialize() // static init
