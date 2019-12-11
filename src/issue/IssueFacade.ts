import { Injectable } from '@nestjs/common'
import { IssueService } from './IssueService'
import { IPaginationOptions } from 'nestjs-typeorm-paginate'
import { FixIssuesDto } from './dto/FixIssuesDto'

@Injectable()
export class IssueFacade {
  constructor(private readonly service: IssueService) {}

  async generateIssues(request, analyzerResults) {
    return this.service.generateIssues(request, analyzerResults)
  }

  fixIssues(dto: FixIssuesDto) {}

  fetchIssues(request, options: IPaginationOptions) {
    return this.service.handleFetchIssues(request, options)
  }
}
