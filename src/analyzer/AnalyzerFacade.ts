import { Injectable } from '@nestjs/common'
import { AnalyzerService } from './AnalyzerService'
import { AnalyzerParams } from './params/AnalyzerParams'

@Injectable()
export class AnalyzerFacade {
  constructor(private readonly service: AnalyzerService) {}

  handleFetch(params: AnalyzerParams): object {
    return this.service.handleFetch(params)
  }
}
