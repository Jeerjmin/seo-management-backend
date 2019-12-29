import * as Queue from 'bull'
import { setQueues } from 'bull-board'
import { Logger } from '@nestjs/common'
import { upperFirst } from 'lodash'

export abstract class AbstractQueueFactory {
  private static readonly QUEUES: Map<string, Queue.Queue> = new Map<string, Queue.Queue>()

  static readonly QUEUE_CONFIG = {
    redis: {
      host: '127.0.0.1',
      port: 6379,
    },
  }

  private static setUpListeners(logger: Logger, queue: Queue.Queue) {
    queue.on('active', (job, _) => {
      logger.log(`Job ${job.id} has started`)
    })

    queue.on('failed', (job, _) => {
      logger.log(`Job ${job.id} failed! :(`)
    })

    queue.on('completed', (job, _) => {
      logger.log(`Job ${job.id} completed!`)
    })
  }

  static registerQueues(...queues: { name: string; queue: Queue.Queue; processor: any }[]) {
    queues.forEach(queue => {
      const logger: Logger = new Logger(`Queue:${upperFirst(queue.name)}`, true)
      setQueues([...AbstractQueueFactory.QUEUES.values(), queue.queue])

      const processor = async (job, done) => {
        if (!queue.processor) {
          logger.error(`No processor for job #${job.id}`)
          done(new Error(`No processor for job #${job.id}`))

          return
        }

        await queue.processor(job, done)
      }

      queue.queue.process(processor)
      if (process.env.NODE_ENV === 'development') {
        AbstractQueueFactory.setUpListeners(logger, queue.queue)
      }

      AbstractQueueFactory.QUEUES.set(queue.name, queue.queue)
    })
  }

  static getQueue(queueName: string): Queue.Queue {
    return AbstractQueueFactory.QUEUES.get(queueName)
  }
}
