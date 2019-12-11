import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { AnalyzerRegistry } from './AnalyzerRegistry'
import { AnalyzerType } from './AnalyzerType'
import { ErrorDto } from 'error/ErrorDto'
import { AnalyzerParams } from './params/AnalyzerParams'
import { AnalyzerDataFetcher } from './AnalyzerDataFetcher'

@Injectable()
export class AnalyzerService {
  constructor(private readonly registry: AnalyzerRegistry, private readonly dataFetcher: AnalyzerDataFetcher) {}

  async handleFetch(params: AnalyzerParams) {
    const typeParam = params.type
    const fieldsParam = params.fields

    const type: AnalyzerType = AnalyzerType[typeParam] as AnalyzerType
    const isTypeValid = type !== undefined && isNaN(+typeParam)

    if (isTypeValid) {
      const analyzer = this.registry.getAnalyzer(type)
      const dataToParse = await this.dataFetcher.getDataToParse()

      if (fieldsParam) {
        return analyzer.getAttributes(dataToParse, ...fieldsParam.split(','))
      }

      // todo improve
      return analyzer.getAttributes(
        dataToParse,
        'altTagsCount',
        'filledAltTagsCount',
        'blankAltTagsCount',
        'filledAltTagsPercent',
      )
    }

    throw new HttpException(new ErrorDto(400, `Unknown analyzer type: ${typeParam}`), HttpStatus.BAD_REQUEST)
  }
}
