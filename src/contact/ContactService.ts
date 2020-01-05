import { Injectable } from '@nestjs/common'
import { MailerService } from '@nest-modules/mailer'
import * as redis from 'redis'
import { ContactQueueFactory } from './ContactQueueFactory'
import { promisify } from 'util'

@Injectable()
export class ContactService {
  constructor(private readonly mailService: MailerService) {}

  async sendMail(from: string, store: string, message: string) {
    const client: redis.RedisClient = redis.createClient(ContactQueueFactory.QUEUE_CONFIG.redis)
    const getAsync = promisify(client.get).bind(client)

    const canSend = (await getAsync(`email_${from}`)) !== ''
    if (canSend) {
      await this.mailService.sendMail({
        to: 'contact@bstefanski.com',
        from,
        subject: `New LP email from ${store}`,
        html: `
          <b>From: </b> ${from} <br />
          <b>Store: </b>  <a target="_blank" href=${store} rel="noopener noreferrer">${store}</a> <br />
          <b>Message: </b> ${message}
        `,
      })
      client.set(`email_${from}`, '', 'EX', 600)
    }

    client.quit()
  }
}
