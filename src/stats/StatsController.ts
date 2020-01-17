import { Controller, Get, UseGuards, Req } from '@nestjs/common'
import { ApiLayers } from 'infrastructure/constants/ApiLayers'
import { ShopifyAuthGuard } from 'auth/ShopifyAuthGuard'
import { StatsFacade } from './StatsFacade'
import { StatsDto } from './StatsDto'
import { Cookie } from 'infrastructure/decorator/CookieDecorator'
import { Cookies } from 'infrastructure/constants/Cookies'

@Controller(ApiLayers.STATS)
export class StatsController {
  constructor(private readonly facade: StatsFacade) {}

  @UseGuards(ShopifyAuthGuard)
  @Get()
  async fetchStats(@Cookie(Cookies.USER_ID) userId: number): Promise<StatsDto> {
    return this.facade.generateOverallStats(userId)
  }
}
