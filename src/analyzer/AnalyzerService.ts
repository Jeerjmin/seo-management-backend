import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { AnalyzerRegistry } from './AnalyzerRegistry'
import { AnalyzerType } from './AnalyzerType'
import { ErrorDto } from 'error/ErrorDto'
import { AnalyzerParams } from './params/AnalyzerParams'
import { AnalyzerDataFetcher } from './AnalyzerDataFetcher'
import { AnalyzerReportDto } from './dto/AnalyzerReportDto'
import { Repository } from 'typeorm'
import { AnalyzerEntity } from './AnalyzerEntity'
import { InjectRepository } from '@nestjs/typeorm'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'

@Injectable()
export class AnalyzerService {
  constructor(
    private readonly registry: AnalyzerRegistry,
    private readonly dataFetcher: AnalyzerDataFetcher,
    @InjectRepository(AnalyzerEntity) private readonly repository: Repository<AnalyzerEntity>,
  ) {}

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

      return analyzer.getResults(dataToParse)
    }

    throw new HttpException(new ErrorDto(400, `Unknown analyzer type: ${typeParam}`), HttpStatus.BAD_REQUEST)
  }

  async generateReport(request, dto: AnalyzerReportDto) {
    const userId = CookieHelper.userIdCookie(request)
    let results: Array<object> = []

    for (const index in dto.options) {
      if (dto.options.hasOwnProperty(index)) {
        const analyzerResults = await this.handleFetch({ type: dto.options[index], fields: null })
        results = [...results, analyzerResults]
      }
    }

    return this.repository.save({ ownerId: userId, details: results })
  }
}
