import { StatsDto } from './StatsDto'
import { Injectable } from '@nestjs/common'
import { StatsService } from './StatsService'

@Injectable()
export class StatsFacade {
  constructor(private readonly service: StatsService) {}

  async generateOverallStats(userId: number): Promise<StatsDto> {
    return this.service.generateOverallStats(userId)
  }
}
