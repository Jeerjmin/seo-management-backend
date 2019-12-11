import { Controller, Get, Req, Query, Post } from '@nestjs/common'
import { ApiLayers } from 'infrastructure/constants/ApiLayers'
import { IssueFacade } from './IssueFacade'

@Controller(ApiLayers.ISSUES)
export class IssueController {
  constructor(private readonly facade: IssueFacade) {}

  @Get()
  fetchAllEndpoint(@Req() request, @Query('page') page: number = 1, @Query('limit') limit: number = 15) {
    return this.facade.fetchIssues(request, { limit, page })
  }

  @Post('generate-issues')
  generateIssuesEndpoint(@Req() request) {
    return this.facade.generateIssues(request)
  }
}
