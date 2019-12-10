import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common'
import { AnalyzerRegistry } from './AnalyzerRegistry'
import { AnalyzerType } from './AnalyzerType'
import { ErrorDto } from 'error/ErrorDto'
import { AnalyzerParams } from './params/AnalyzerParams'
import { AnalyzerDataFetcher } from './AnalyzerDataFetcher'
import { AnalyzerReportDto } from './dto/AnalyzerReportDto'
import { Repository, Not } from 'typeorm'
import { AnalyzerEntity } from './AnalyzerEntity'
import { InjectRepository } from '@nestjs/typeorm'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate'

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

  async fetchLatestReport(request) {
    const userId = CookieHelper.userIdCookie(request)
    return this.repository.findOne({ where: { ownerId: userId }, order: { createdAt: 'DESC' } })
  }

  async fetchPenultReport(request, lastId: number) {
    const userId = CookieHelper.userIdCookie(request)
    return this.repository.findOne({ where: { ownerId: userId, id: Not(lastId), order: { createdAt: 'DESC' } } })
  }

  async fetchReports(request, options: IPaginationOptions): Promise<Pagination<any>> {
    const userId = CookieHelper.userIdCookie(request)
    const queryBuilder = this.repository.createQueryBuilder('report')

    queryBuilder.where({ ownerId: userId })
    queryBuilder.orderBy('report.createdAt', 'DESC')

    return paginate<AnalyzerEntity>(queryBuilder, options)
  }

  async fetchReport(id: number) {
    const entity = await this.repository.findOne({ where: { id } })

    if (!entity) {
      throw new NotFoundException()
    }

    return entity
  }
}
