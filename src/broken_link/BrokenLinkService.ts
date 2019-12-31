import { Injectable } from '@nestjs/common'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'
import { BrokenLinkEntity } from './BrokenLinkEntity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BrokenLinkDto } from './dto/BrokenLinkDto'
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate'

@Injectable()
export class BrokenLinkService {
  constructor(@InjectRepository(BrokenLinkEntity) private readonly repository: Repository<BrokenLinkEntity>) {}

  async fetchLatest(request, options: IPaginationOptions): Promise<BrokenLinkEntity | {}> {
    const userId: number = CookieHelper.userIdCookie(request)
    const queryBuilder = this.repository.createQueryBuilder('brokenLink')

    queryBuilder.where('brokenLink.ownerId = :userId', { userId })
    queryBuilder.orderBy('brokenLink.createdAt', 'DESC')

    return paginate<BrokenLinkEntity>(queryBuilder, options)
  }

  async save(userId: number, data: BrokenLinkDto[]) {
    this.removeIfPresent(userId)
    const brokenLinks = data

    brokenLinks.forEach(brokenLink => {
      brokenLink.ownerId = userId
    })

    this.repository.save(brokenLinks)
  }

  private async removeIfPresent(userId: number): Promise<void> {
    const entitiesCount = await this.repository.count({ where: { ownerId: userId } })
    if (entitiesCount >= 1) {
      this.repository.delete({ ownerId: userId })
    }
  }
}
