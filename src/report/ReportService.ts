import { Injectable, BadRequestException } from '@nestjs/common'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'
import { Repository, Not, FindManyOptions } from 'typeorm'
import { ReportEntity } from './ReportEntity'
import { InjectRepository } from '@nestjs/typeorm'
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate'
import { RepositoryHelper } from 'infrastructure/helper/RepositoryHelper'
import { ReportDto } from './dto/ReportDto'
import { ReportParamsValidator } from './ReportParamsValidator'

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ReportEntity) private readonly repository: Repository<ReportEntity>,
    private readonly paramsValidator: ReportParamsValidator,
  ) {}

  async generateReport(userId: number, analyzerResults) {
    const entity = await this.repository.save(
      new ReportEntity(userId, {
        accessibilityScore: this.convertToNumber(analyzerResults['Accessibility Score']),
        performanceScore: this.convertToNumber(analyzerResults['Performance Score']),
        bestPracticesScore: this.convertToNumber(analyzerResults['Best Practices Score']),
        altTagsCount: this.convertToNumber(analyzerResults['Alt tags count']),
        filledAltTagsCount: this.convertToNumber(analyzerResults['Filled alt tags count']),
        firstContentfulPaint: analyzerResults['First Contentful Paint'],
        speedIndex: analyzerResults['Speed Index'],
        timeToInteractive: analyzerResults['Time To Interactive'],
        firstMeaningfulPaint: analyzerResults['First Meaningful Paint'],
        firstCpuIdle: analyzerResults['First CPU Idle'],
        estimatedInputLatency: analyzerResults['Estimated Input Latency'],
        consoleErrors: analyzerResults['Console errors'],
        vulnerableLibraries: analyzerResults['No vulnerable libraries'],
        avoidsDeprecatedApis: analyzerResults['Avoids deprecated APIs'],
        allowsPastePassword: analyzerResults['Allows users to paste into password fields'],
        correctAspectRatio: analyzerResults['Displays images with correct aspect ratio'],
        avoidsCrossLinks: analyzerResults['Avoids links to cross-origin destinations'],
        usesHttps: analyzerResults['Uses HTTPS'],
      }),
    )

    return { ...entity, details: { ...entity.details, id: undefined } }
  }

  private convertToNumber(analyzerResultsProperty: any): null | number {
    const convertedProperty: number = analyzerResultsProperty
    return Number.isNaN(convertedProperty) ? null : convertedProperty
  }

  async fetchLatestReport(userId: number): Promise<ReportDto> {
    return this.repository.findOne({ where: { ownerId: userId }, order: { createdAt: 'DESC' } })
  }

  async fetchPenultReport(userId: number, lastId): Promise<ReportDto> {
    const options: FindManyOptions = {
      where: { id: Not(lastId), ownerId: userId, order: { createdAt: 'DESC' } },
    }
    const entitiesCount = await this.repository.count(options)

    const entities = await this.repository.find(options)
    return entities[entitiesCount - 1]
  }

  async fetchReports(userId: number, options: IPaginationOptions): Promise<Pagination<ReportDto>> {
    const queryBuilder = this.repository.createQueryBuilder('report')
    queryBuilder.where({ ownerId: userId })

    queryBuilder.orderBy('report.createdAt', 'DESC')
    return paginate<ReportEntity>(queryBuilder, options)
  }

  async fetchReport(id: number): Promise<ReportDto> {
    const isValid = this.paramsValidator.isValid(id)

    if (!isValid) {
      throw new BadRequestException()
    }

    return RepositoryHelper.findOneOrThrow(this.repository, { where: { id } })
  }
}
