import { Processor } from 'infrastructure/queue/Processor'
import { ContactService } from './ContactService'

export class SendMailProcessor implements Processor<any> {
  constructor(private readonly contactService: ContactService) {}

  async process(done: any, job: any) {
    const { from, store, message }: { from: string; store: string; message: string } = job.data
    done(null, await this.contactService.sendMail(from, store, message))
  }
}
