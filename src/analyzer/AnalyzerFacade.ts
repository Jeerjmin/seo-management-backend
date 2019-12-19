import { Injectable } from '@nestjs/common'
import { AnalyzerService } from './AnalyzerService'

@Injectable()
export class AnalyzerFacade {
  constructor(private readonly service: AnalyzerService) {}

  getResults(
    analyzerType: string,
    formatterType: string | number,
    data?: any,
    additionalDependencies: any[] = [],
    ...attrs: string[]
  ): any {
    return this.service.getResults(analyzerType, formatterType, data, additionalDependencies, ...attrs)
  }
}
