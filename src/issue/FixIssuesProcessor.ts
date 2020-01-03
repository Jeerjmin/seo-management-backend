import { Processor } from 'infrastructure/queue/Processor'
import { FixerType } from 'fixer/FixerType'
import { FixerFacade } from 'fixer/FixerFacade'
import { FixIssuesDto } from './dto/FixIssuesDto'

export class FixIssuesProcessor implements Processor<any> {
  constructor(private readonly fixerFacade: FixerFacade) {}

  async process(done: any, job: any) {
    const {
      userId,
      shopPrefix,
      session,
      dto,
    }: { userId: number; shopPrefix: string; session: string; dto: FixIssuesDto } = job.data
    const jobCallback = () => {
      job.progress(job.progress() + 0.15)
    }

    done(
      null,
      await this.fixerFacade.fix(FixerType.ALT_TAGS, {
        userId,
        shopPrefix,
        session,
        template: dto.template,
        jobCallback,
      }),
    )
  }
}
