import { Injectable } from '@nestjs/common'
import { AnalyzerService } from './AnalyzerService'

@Injectable()
export class AnalyzerFacade {
  constructor(private readonly service: AnalyzerService) {}

  handleFetch(analyzerType: string): object {
    return this.service.handleFetch(analyzerType)
  }
}
