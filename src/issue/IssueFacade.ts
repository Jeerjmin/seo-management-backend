import { Injectable } from '@nestjs/common'
import { IssueService } from './IssueService'
import { IPaginationOptions } from 'nestjs-typeorm-paginate'

@Injectable()
export class IssueFacade {
  constructor(private readonly service: IssueService) {}

  generateIssues(request, analyzerResults) {
    return this.service.generateIssues(request, analyzerResults)
  }

  fetchIssues(request, options: IPaginationOptions, type: string) {
    return this.service.handleFetchIssues(request, options, type)
  }
}
