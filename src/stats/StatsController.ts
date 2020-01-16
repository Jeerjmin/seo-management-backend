import { Controller, Get, UseGuards, Req } from '@nestjs/common'
import { ApiLayers } from 'infrastructure/constants/ApiLayers'
import { ShopifyAuthGuard } from 'auth/ShopifyAuthGuard'
import { StatsFacade } from './StatsFacade'
import { StatsDto } from './StatsDto'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'

@Controller(ApiLayers.STATS)
export class StatsController {
  constructor(private readonly facade: StatsFacade) {}

  @UseGuards(ShopifyAuthGuard)
  @Get()
  async fetchStats(@Req() request): Promise<StatsDto> {
    const userId: number = CookieHelper.userIdCookie(request)
    return this.facade.generateOverallStats(userId)
  }
}
