import { Injectable } from '@nestjs/common'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'
import { BrokenLinkEntity } from './BrokenLinkEntity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BrokenLinkDto } from './dto/BrokenLinkDto'

@Injectable()
export class BrokenLinkService {
  constructor(@InjectRepository(BrokenLinkEntity) private readonly repository: Repository<BrokenLinkEntity>) {}

  async fetchLatest(request): Promise<BrokenLinkEntity | {}> {
    const userId: number = CookieHelper.userIdCookie(request)
    const entity: any = await this.repository.findOne({
      where: { ownerId: userId },
      order: { createdAt: 'DESC' },
    })

    return entity ? { ...entity, items: entity.brokenLinks } : { items: [] }
  }

  async save(request, data: BrokenLinkDto) {
    const userId: number = CookieHelper.userIdCookie(request)
    this.removeIfPresent(userId)

    this.repository.save({ ...data, ownerId: userId })
  }

  private async removeIfPresent(userId: number): Promise<void> {
    const entitiesCount = await this.repository.count({ where: { ownerId: userId } })
    if (entitiesCount >= 1) {
      this.repository.delete({ ownerId: userId })
    }
  }
}
