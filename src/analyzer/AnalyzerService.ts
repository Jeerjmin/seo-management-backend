import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { AnalyzerRegistry } from './AnalyzerRegistry'
import { AnalyzerType } from './AnalyzerType'
import { ErrorDto } from 'error/ErrorDto'
import { HttpService } from 'http/HttpService'
import { ConfigService } from 'config/ConfigService'

@Injectable()
export class AnalyzerService {
  constructor(private readonly registry: AnalyzerRegistry, private readonly httpService: HttpService, private readonly configService: ConfigService) {}

  async getResults(analyzerType: string, formatterType: string | number = 'DEFAULT', data?: any, ...attrs: string[]) {
    const type: AnalyzerType = AnalyzerType[analyzerType] as AnalyzerType
    const isTypeValid = type !== undefined && isNaN(+analyzerType)

    if (isTypeValid) {
      const analyzer = this.registry.getAnalyzer(type)
      const dependencies = [this.httpService, this.configService]

      if (attrs.length > 0) {
        return analyzer.getResults(formatterType, data, dependencies, ...attrs)
      }

      return analyzer.getResults(formatterType, data, dependencies)
    }

    throw new HttpException(new ErrorDto(400, `Unknown analyzer type: ${analyzerType}`), HttpStatus.BAD_REQUEST)
  }
}
