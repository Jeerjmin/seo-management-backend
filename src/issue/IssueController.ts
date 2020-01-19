import { Controller, Get, Req, Query, Post, UseGuards, Body, Res, Param } from '@nestjs/common'
import { ApiLayers } from 'infrastructure/constants/ApiLayers'
import { IssueFacade } from './IssueFacade'
import { ShopifyAuthGuard } from 'auth/ShopifyAuthGuard'
import { FixIssuesDto } from './dto/FixIssuesDto'

@UseGuards(ShopifyAuthGuard)
@Controller(ApiLayers.ISSUES)
export class IssueController {
  constructor(private readonly facade: IssueFacade) {}

  @Get()
  fetchAllEndpoint(
    @Req() request,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 15,
    @Query('type') type: string = 'product',
  ) {
    return this.facade.fetchIssues(request, { limit, page }, type)
  }

  @Get('queue/:id')
  async fetchQueueStatus(@Param('id') id: number) {
    return this.facade.fetchIssueStatus(id)
  }

  @Post('fix')
  fixIssues(@Req() request, @Res() response, @Body() dto: FixIssuesDto) {
    return this.facade.fixIssues(request, response, dto)
  }
}
