import { Injectable } from '@nestjs/common'
import { IssueEntity } from './IssueEntity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate'
import { IssueDto } from './dto/IssueDto'
import { IssueType } from './IssueType'

@Injectable()
export class IssueService {
  constructor(@InjectRepository(IssueEntity) private readonly repository: Repository<IssueEntity>) {}

  generateIssues(request, analyzerResults) {
    const userId = CookieHelper.userIdCookie(request)

    for (const item in analyzerResults) {
      if (analyzerResults.hasOwnProperty(item)) {
        const results = analyzerResults[item]

        for (const result in analyzerResults[item]) {
          if (analyzerResults[item].hasOwnProperty(result)) {
            const resultItem = analyzerResults[item][result]

            console.log(resultItem)

            // products: []
            //   {
            //      seoScore: 99.97,
            //      issuesCount: 4,
            //      src: ''
            //      title: ''
            //   }
            // ]

            // this.repository.save(new Issue)
          }
        }
        console.log(item)
      }
    }

    // this.repository.save(new IssueDto(userId, IssueType., ))
  }

  handleFetchIssues(request, options: IPaginationOptions) {
    const userId = CookieHelper.userIdCookie(request)
    const queryBuilder = this.repository.createQueryBuilder('issue')
    queryBuilder.where({ ownerId: userId })
    queryBuilder.orderBy('issue.createdAt', 'DESC')

    return paginate<IssueEntity>(queryBuilder, options)
  }
}
