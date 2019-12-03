import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { AnalyzerRegistry } from './AnalyzerRegistry'
import { AnalyzerType } from './AnalyzerType'
import { ErrorDto } from 'error/ErrorDto'
import { AnalyzerParams } from './params/AnalyzerParams'

@Injectable()
export class AnalyzerService {
  constructor(private readonly registry: AnalyzerRegistry) {}

  handleFetch(params: AnalyzerParams) {
    const typeParam = params.type
    const fieldsParam = params.fields

    const type: AnalyzerType = AnalyzerType[typeParam] as AnalyzerType
    const isTypeValid = type !== undefined && isNaN(+typeParam)

    if (isTypeValid) {
      const analyzer = this.registry.getAnalyzer(type)

      if (fieldsParam) {
        return analyzer.getAttributes(...fieldsParam.split(','))
      }

      return analyzer.getResults()
    }

    throw new HttpException(new ErrorDto(400, `Unknown analyzer type: ${typeParam}`), HttpStatus.BAD_REQUEST)
  }
}
