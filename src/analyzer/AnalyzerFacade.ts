import { Injectable } from '@nestjs/common'
import { AnalyzerService } from './AnalyzerService'
import { AnalyzerParams } from './params/AnalyzerParams'
import { UserFacade } from 'user/UserFacade'

@Injectable()
export class AnalyzerFacade {
  constructor(private readonly service: AnalyzerService, private readonly userFacade: UserFacade) {}

  handleFetch(params: AnalyzerParams): any {
    return this.service.handleFetch(params)
  }
}
