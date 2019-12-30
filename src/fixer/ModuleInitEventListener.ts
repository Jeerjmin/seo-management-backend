import { OnModuleInit, Injectable } from '@nestjs/common'
import { FixerRegistry } from './FixerRegistry'
import { FixerType } from './FixerType'
import { AltTagsFixer } from './AltTagsFixer'
import { AnalyzerFacade } from 'analyzer/AnalyzerFacade'

@Injectable()
export class ModuleInitEventListener implements OnModuleInit {
  constructor(private readonly registry: FixerRegistry, private readonly analyzerFacade: AnalyzerFacade) {}

  onModuleInit() {
    this.registry.register({ type: FixerType.ALT_TAGS, instance: new AltTagsFixer(this.analyzerFacade) })
  }
}
