import { Injectable, HttpStatus } from '@nestjs/common'
import { ContactQueueFactory } from './ContactQueueFactory'
import { Queues } from 'infrastructure/constants/Queues'
import { uniqueId } from 'lodash'
import { ContactDto } from './dto/ContactDto'
import { FastifyReply, FastifyRequest } from 'fastify'

@Injectable()
export class ContactFacade {
  sendMail(dto: ContactDto, response: FastifyReply<any>) {
    const queue = ContactQueueFactory.getQueue(Queues.SEND_MAIL)
    const jobId = uniqueId()

    queue.add(
      { from: dto.from, store: dto.store, message: dto.message },
      { jobId, removeOnComplete: true, removeOnFail: true },
    )

    response
      .header('Location', `/contacts/queue/${jobId}`)
      .status(HttpStatus.ACCEPTED)
      .send()
  }
}
