import { Injectable } from '@nestjs/common'
import { IssueService } from './IssueService'
import { IPaginationOptions } from 'nestjs-typeorm-paginate'

@Injectable()
export class IssueFacade {
  constructor(private readonly service: IssueService) {}

  generateIssues(userId: number, analyzerResults) {
    return this.service.generateIssues(userId, analyzerResults)
  }

  fetchIssues(request, options: IPaginationOptions, type: string) {
    return this.service.handleFetchIssues(request, options, type)
  }
}
