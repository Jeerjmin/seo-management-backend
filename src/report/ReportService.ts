import { Injectable } from '@nestjs/common'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'
import { Repository, Not, FindManyOptions } from 'typeorm'
import { ReportEntity } from './ReportEntity'
import { InjectRepository } from '@nestjs/typeorm'
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate'
import { RepositoryHelper } from 'infrastructure/helper/RepositoryHelper'
import { ReportDto } from './dto/ReportDto'

@Injectable()
export class ReportService {
  constructor(@InjectRepository(ReportEntity) private readonly repository: Repository<ReportEntity>) {}

  async generateReport(request, analyzerResults) {
    const userId = CookieHelper.userIdCookie(request)

    const entity = await this.repository.save(
      new ReportEntity(userId, {
        accessibilityScore: Number(analyzerResults['Accessibility Score']),
        performanceScore: Number(analyzerResults['Performance Score']),
        bestPracticesScore: Number(analyzerResults['Best Practices Score']),
        altTagsCount: Number(analyzerResults['Alt tags count']),
        filledAltTagsCount: Number(analyzerResults['Filled alt tags count']),
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

  async fetchLatestReport(request): Promise<ReportDto> {
    const userId = CookieHelper.userIdCookie(request)
    return this.repository.findOne({ where: { ownerId: userId }, order: { createdAt: 'DESC' } })
  }

  async fetchPenultReport(request, lastId): Promise<ReportDto> {
    const userId = CookieHelper.userIdCookie(request)
    const options: FindManyOptions = {
      where: { id: Not(lastId), ownerId: userId, order: { createdAt: 'DESC' } },
    }

    const entitiesCount = await this.repository.count(options)
    const entities = await this.repository.find(options)

    return entities[entitiesCount - 1]
  }

  async fetchReports(request, options: IPaginationOptions): Promise<Pagination<ReportDto>> {
    const userId = CookieHelper.userIdCookie(request)
    const queryBuilder = this.repository.createQueryBuilder('report')

    queryBuilder.where({ ownerId: userId })
    queryBuilder.orderBy('report.createdAt', 'DESC')

    return paginate<ReportEntity>(queryBuilder, options)
  }

  async fetchReport(id: number): Promise<ReportDto> {
    // param validation
    return RepositoryHelper.findOneOrThrow(this.repository, { where: { id } })
  }
}
