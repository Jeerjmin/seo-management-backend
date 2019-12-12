import { OnModuleInit, Injectable } from '@nestjs/common'
import { AnalyzerRegistry } from './AnalyzerRegistry'
import { AnalyzerType } from './AnalyzerType'
import { AltTagsAnalyzer } from './alt_tags/AltTagsAnalyzer'
import { HttpService } from 'http/HttpService'

@Injectable()
export class AnalyzerModuleInitListener implements OnModuleInit {
  constructor(private readonly analyzerRegistry: AnalyzerRegistry, private readonly httpService: HttpService) {}

  onModuleInit() {
    this.analyzerRegistry.register({ type: AnalyzerType.ALT_TAGS, instance: new AltTagsAnalyzer(this.httpService) })
  }
}
