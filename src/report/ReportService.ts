import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'
import { ReportDto } from './dto/ReportDto'
import { Repository, Not, FindManyOptions } from 'typeorm'
import { ReportEntity } from './ReportEntity'
import { InjectRepository } from '@nestjs/typeorm'
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate'
import { ErrorDto } from 'error/ErrorDto'

@Injectable()
export class ReportService {
  constructor(@InjectRepository(ReportEntity) private readonly repository: Repository<ReportEntity>) {}

  async generateReport(request, dto: ReportDto, analyzerResults) {
    const userId = CookieHelper.userIdCookie(request)
    let results: Array<object> = []

    for (const index in dto.options) {
      if (dto.options.hasOwnProperty(index)) {
        results = [...results, await analyzerResults(index)]
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
    const options: FindManyOptions = {
      where: { id: Not(lastId), ownerId: userId, order: { createdAt: 'DESC' } },
    }

    const entitiesCount: number = await this.repository.count(options)
    const entities = await this.repository.find(options)

    return entities[entitiesCount - 1]
  }

  async fetchReports(request, options: IPaginationOptions): Promise<Pagination<any>> {
    const userId = CookieHelper.userIdCookie(request)
    const queryBuilder = this.repository.createQueryBuilder('report')

    queryBuilder.where({ ownerId: userId })
    queryBuilder.orderBy('report.createdAt', 'DESC')

    return paginate<ReportEntity>(queryBuilder, options)
  }

  async fetchReport(id: number) {
    // todo abstraction for not found
    const entity = await this.repository.findOne({ where: { id } })

    if (!entity) {
      throw new HttpException(new ErrorDto(404, 'Not Found'), HttpStatus.NOT_FOUND)
    }

    return entity
  }
}
