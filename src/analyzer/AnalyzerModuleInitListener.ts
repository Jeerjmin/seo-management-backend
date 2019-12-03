import { OnModuleInit, Injectable } from '@nestjs/common'
import { AnalyzerRegistry } from './AnalyzerRegistry'
import { AnalyzerType } from './AnalyzerType'
import { AltTagsAnalyzer } from './AltTagsAnalyzer'

@Injectable()
export class AnalyzerModuleInitListener implements OnModuleInit {
  constructor(private readonly analyzerRegistry: AnalyzerRegistry) {}

  onModuleInit() {
    this.analyzerRegistry.register({ type: AnalyzerType.ALT_TAGS, instance: new AltTagsAnalyzer() })
  }
}
