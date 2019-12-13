import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { AnalyzerRegistry } from './AnalyzerRegistry'
import { AnalyzerType } from './AnalyzerType'
import { ErrorDto } from 'error/ErrorDto'
import { HttpService } from 'http/HttpService'

@Injectable()
export class AnalyzerService {
  constructor(private readonly registry: AnalyzerRegistry, private readonly httpService: HttpService) {}

  async getResults(analyzerType: string, formatterType: string | number, data?: any, ...attrs: string[]) {
    const type: AnalyzerType = AnalyzerType[analyzerType] as AnalyzerType
    const isTypeValid = type !== undefined && isNaN(+analyzerType)

    if (isTypeValid) {
      const analyzer = this.registry.getAnalyzer(type)

      if (attrs.length > 0) {
        return analyzer.getResults(formatterType, data, [this.httpService], ...attrs)
      }

      return analyzer.getResults(formatterType, data, [this.httpService])
    }

    throw new HttpException(new ErrorDto(400, `Unknown analyzer type: ${analyzerType}`), HttpStatus.BAD_REQUEST)
  }
}
