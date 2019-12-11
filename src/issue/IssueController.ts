import { Controller, Get, Req, Query, Post, UseGuards } from '@nestjs/common'
import { ApiLayers } from 'infrastructure/constants/ApiLayers'
import { IssueFacade } from './IssueFacade'
import { ShopifyAuthGuard } from 'auth/ShopifyAuthGuard'

@UseGuards(ShopifyAuthGuard)
@Controller(ApiLayers.ISSUES)
export class IssueController {
  constructor(private readonly facade: IssueFacade) {}

  @Get()
  fetchAllEndpoint(
    @Req() request,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 15,
    @Query('type') type: string = 'prodcuts',
  ) {
    return this.facade.fetchIssues(request, { limit, page }, type)
  }
}
