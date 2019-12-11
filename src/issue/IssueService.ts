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

  async generateIssues(request, analyzerResults) {
    const userId = CookieHelper.userIdCookie(request)

    await this.repository.delete({ ownerId: userId })

    const products = this.filterNotNull(analyzerResults.products)
    const pages = this.filterNotNull(analyzerResults.pages)
    const articles = this.filterNotNull(analyzerResults.articles)
    const customCollections = this.filterNotNull(analyzerResults.customCollections)
    const smartCollections = this.filterNotNull(analyzerResults.smartCollections)

    products.forEach(element => {
      element.images.forEach(image => {
        this.repository.save({
          ownerId: userId,
          type: IssueType.PRODUCT,
          imageSrc: image.src,
          title: element.title,
          description: '',
          seoScore: element.filledAltTagsPercent,
          seoIssues: element.altTagsCount - element.filledAltTagsCount,
        })
      })
    })

    pages.forEach(element => {
      this.repository.save({
        ownerId: userId,
        type: IssueType.PAGE,
        imageSrc: '',
        title: element.title,
        description: '',
        seoScore: element.filledAltTagsPercent,
        seoIssues: element.altTagsCount - element.filledAltTagsCount,
      })
    })

    articles.forEach(element => {
      this.repository.save({
        ownerId: userId,
        type: IssueType.ARTICLE,
        imageSrc: element.image.src,
        title: element.title,
        description: '',
        seoScore: element.filledAltTagsPercent,
        seoIssues: element.altTagsCount - element.filledAltTagsCount,
      })
    })

    customCollections.forEach(element => {
      this.repository.save({
        ownerId: userId,
        type: IssueType.CUSTOM_COLLECTIONS,
        imageSrc: element.image.src,
        title: element.title,
        description: '',
        seoScore: element.filledAltTagsPercent,
        seoIssues: element.altTagsCount - element.filledAltTagsCount,
      })
    })

    smartCollections.forEach(element => {
      this.repository.save({
        ownerId: userId,
        type: IssueType.CUSTOM_COLLECTIONS,
        imageSrc: element.image.src,
        title: element.title,
        description: '',
        seoScore: element.filledAltTagsPercent,
        seoIssues: element.altTagsCount - element.filledAltTagsCount,
      })
    })
  }

  handleFetchIssues(request, options: IPaginationOptions) {
    const userId = CookieHelper.userIdCookie(request)
    const queryBuilder = this.repository.createQueryBuilder('issue')
    queryBuilder.where({ ownerId: userId })
    queryBuilder.orderBy('issue.createdAt', 'DESC')

    return paginate<IssueEntity>(queryBuilder, options)
  }

  private filterNotNull(data: any) {
    return data.filter(element => element.altTagsCount > element.filledAltTagsCount)
  }
}
