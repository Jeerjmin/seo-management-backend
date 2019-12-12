import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { AnalyzerRegistry } from './AnalyzerRegistry'
import { AnalyzerType } from './AnalyzerType'
import { ErrorDto } from 'error/ErrorDto'

@Injectable()
export class AnalyzerService {
  constructor(private readonly registry: AnalyzerRegistry) {}

  async getResults(analyzerType: string, formatterType: string | number, ...attrs: string[]) {
    const type: AnalyzerType = AnalyzerType[analyzerType] as AnalyzerType
    const isTypeValid = type !== undefined && isNaN(+analyzerType)

    if (isTypeValid) {
      const analyzer = this.registry.getAnalyzer(type)

      if (attrs.length > 0) {
        return analyzer.getResults(formatterType, ...attrs)
      }

      return analyzer.getResults(formatterType)
    }

    throw new HttpException(new ErrorDto(400, `Unknown analyzer type: ${analyzerType}`), HttpStatus.BAD_REQUEST)
  }
}
