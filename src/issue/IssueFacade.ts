import { Injectable } from '@nestjs/common'
import { IssueService } from './IssueService'
import { IPaginationOptions } from 'nestjs-typeorm-paginate'
import { FixIssuesDto } from './dto/FixIssuesDto'
import { AnalyzerFacade } from 'analyzer/AnalyzerFacade'
import { AnalyzerType } from 'analyzer/AnalyzerType'

@Injectable()
export class IssueFacade {
  constructor(private readonly service: IssueService, private readonly analyzerFacade: AnalyzerFacade) {}

  async generateIssues(request) {
    const analyzerResults = await this.analyzerFacade.compute({
      type: AnalyzerType.ALT_TAGS,
      fields: 'products,pages,articles,customCollections,smartCollections',
    })
    return this.service.generateIssues(request, analyzerResults)
  }

  fixIssues(dto: FixIssuesDto) {}

  fetchIssues(request, options: IPaginationOptions) {
    return this.service.handleFetchIssues(request, options)
  }
}
