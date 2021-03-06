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
    job.progress(0.5)
    done(
      null,
      await this.fixerFacade.fix(FixerType.ALT_TAGS, {
        userId,
        shopPrefix,
        session,
        productTemplate: this.ensureNotEmpty(dto.productTemplate, '[product-title] - [shop-name]'),
        overallTemplate: this.ensureNotEmpty(dto.overallTemplate, '[page-title] - [shop-name]'),
        override: dto.override,
      }),
    )
  }

  private ensureNotEmpty(value: string, defaultTemplate: string): string {
    return value.length === 0 ? defaultTemplate : value
  }
}
