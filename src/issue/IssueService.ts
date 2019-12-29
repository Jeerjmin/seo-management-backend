import { Injectable } from '@nestjs/common'
import { IssueEntity } from './IssueEntity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate'
import { IssueType } from './IssueType'

@Injectable()
export class IssueService {
  constructor(@InjectRepository(IssueEntity) private readonly repository: Repository<IssueEntity>) {}

  async generateIssues(userId: number, analyzerResults) {
    await this.repository.delete({ ownerId: userId })

    analyzerResults.forEach(element => {
      this.repository.save({
        ownerId: userId,
        type: IssueType[element.type] as IssueType,
        imageSrc: element.image ? element.image.src : element.src,
        title: element.title,
        description: '',
        seoScore: element.filledAltTagsPercent,
        seoIssues: element.altTagsCount - element.filledAltTagsCount,
      })
    })
  }

  handleFetchIssues(request, options: IPaginationOptions, type: string) {
    const userId = CookieHelper.userIdCookie(request)
    const queryBuilder = this.repository.createQueryBuilder('issue')

    queryBuilder
      .where('issue.ownerId = :userId', { userId })
      .andWhere('issue.type = :type', { type })
      .orderBy('issue.createdAt', 'DESC')
    return paginate<IssueEntity>(queryBuilder, options)
  }
}
