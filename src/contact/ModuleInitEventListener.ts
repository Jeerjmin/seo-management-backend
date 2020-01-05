import { OnModuleInit, Injectable } from '@nestjs/common'
import { ContactService } from './ContactService'
import { ContactQueueFactory } from './ContactQueueFactory'
import { Queues } from 'infrastructure/constants/Queues'
import * as Queue from 'bull'
import { SendMailProcessor } from './SendMailProcessor'

@Injectable()
export class ModuleInitEventListener implements OnModuleInit {
  constructor(private readonly contactService: ContactService) {}

  onModuleInit() {
    const sendMailProcessor: SendMailProcessor = new SendMailProcessor(this.contactService)
    ContactQueueFactory.registerQueues({
      name: Queues.SEND_MAIL,
      queue: new Queue(Queues.SEND_MAIL, ContactQueueFactory.QUEUE_CONFIG),
      processor: async (job, done) => sendMailProcessor.process(done, job),
    })
  }
}
