import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { AnalyzerRegistry } from './AnalyzerRegistry'
import { AnalyzerType } from './AnalyzerType'
import { ErrorDto } from 'error/ErrorDto'

@Injectable()
export class AnalyzerService {
  constructor(private readonly registry: AnalyzerRegistry) {}

  handleFetch(analyzerType: string) {
    const type: AnalyzerType = AnalyzerType[analyzerType] as AnalyzerType
    const isTypeValid = type !== undefined && isNaN(+analyzerType)

    if (isTypeValid) {
      return this.registry.getAnalyzer(type).getResults()
    }

    throw new HttpException(new ErrorDto(400, `Unknown analyzer type: ${analyzerType}`), HttpStatus.BAD_REQUEST)
  }
}
