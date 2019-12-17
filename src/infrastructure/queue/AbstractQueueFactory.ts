import { UnsupportedOperationError } from 'infrastructure/error/UnsupportedOperationError'
import * as Queue from 'bull'
import { setQueues } from 'bull-board'
import { Logger } from '@nestjs/common'

export abstract class AbstractQueueFactory {
  private static readonly QUEUES: Map<string, Queue.Queue> = new Map<string, Queue.Queue>()
  private static readonly PROCESSORS: Map<string, Function> = new Map<string, Function>()
  private static readonly LOGGER = new Logger('QueueFactory', true)

  protected static readonly QUEUE_CONFIG = {
    redis: {
      host: '127.0.0.1',
      port: 6379,
    },
  }

  static initialize() {
    throw new UnsupportedOperationError()
  }

  protected static registerQueue(queueName: string, queue: Queue.Queue) {
    setQueues([...AbstractQueueFactory.QUEUES.values(), queue])
    const defaultProcessorFunction = async (job, done) => {
      AbstractQueueFactory.LOGGER.error(`Empty queue (${queueName}) processor for job #${job.id}`)
      done()
    }

    AbstractQueueFactory.PROCESSORS.set(queueName, defaultProcessorFunction)
    queue.process(async (job, done) => AbstractQueueFactory.PROCESSORS.get(queueName)(job, done))

    if (process.env.NODE_ENV === 'development') {
      AbstractQueueFactory.setUpListeners(queue)
    }

    AbstractQueueFactory.QUEUES.set(queueName, queue)
  }

  private static setUpListeners(queue: Queue.Queue) {
    queue.on('active', (job, _) => {
      AbstractQueueFactory.LOGGER.log(`Job ${job.id} has started`)
    })

    queue.on('failed', (job, _) => {
      AbstractQueueFactory.LOGGER.log(`Job ${job.id} failed! :(`)
    })

    queue.on('completed', (job, _) => {
      AbstractQueueFactory.LOGGER.log(`Job ${job.id} completed!`)
    })
  }

  static getQueue(queueName: string, processorCallback?: Function): Queue.Queue {
    if (processorCallback) {
      AbstractQueueFactory.PROCESSORS.set(queueName, processorCallback)
    }
    return AbstractQueueFactory.QUEUES.get(queueName)
  }
}
