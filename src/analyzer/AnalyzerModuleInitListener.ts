import { OnModuleInit, Injectable } from '@nestjs/common'
import { AnalyzerRegistry } from './AnalyzerRegistry'
import { AnalyzerType } from './AnalyzerType'
import { AltTagsAnalyzer } from './alt_tags/AltTagsAnalyzer'
import { PerformanceAnalyzer } from './performance/PerformanceAnalyzer'

@Injectable()
export class AnalyzerModuleInitListener implements OnModuleInit {
  constructor(private readonly analyzerRegistry: AnalyzerRegistry) {}

  onModuleInit() {
    this.analyzerRegistry.register(
      { type: AnalyzerType.ALT_TAGS, instance: new AltTagsAnalyzer() },
      { type: AnalyzerType.PERFORMANCE, instance: new PerformanceAnalyzer() },
    )
  }
}
