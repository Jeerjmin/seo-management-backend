import { Injectable } from '@nestjs/common'
import { AnalyzerFacade } from 'analyzer/AnalyzerFacade'
import { ReportDto } from './dto/ReportDto'
import { IPaginationOptions } from 'nestjs-typeorm-paginate'
import { ReportService } from './ReportService'

@Injectable()
export class ReportFacade {
  constructor(private readonly analyzerFacade: AnalyzerFacade, private readonly service: ReportService) {}

  fetchReports(request, options: IPaginationOptions) {
    return this.service.fetchReports(request, options)
  }

  fetchReport(id: number) {
    return this.service.fetchReport(id)
  }

  generateReport(request, dto: ReportDto) {
    const analyzerResults = index => this.analyzerFacade.compute({ type: dto.options[index], fields: null })
    return this.service.generateReport(request, dto, analyzerResults)
  }

  fetchLatestReport(request) {
    return this.service.fetchLatestReport(request)
  }

  fetchPenultReport(request, id: number) {
    return this.service.fetchPenultReport(request, id)
  }
}
