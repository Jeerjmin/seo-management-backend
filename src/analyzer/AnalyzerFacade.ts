import { Injectable } from '@nestjs/common'
import { AnalyzerService } from './AnalyzerService'
import { AnalyzerParams } from './params/AnalyzerParams'
import { AnalyzerRaportDto } from './dto/AnalyzerRaportDto'

@Injectable()
export class AnalyzerFacade {
  constructor(private readonly service: AnalyzerService) {}

  handleFetch(params: AnalyzerParams): object {
    return this.service.handleFetch(params)
  }

  generateRaport(dto: AnalyzerRaportDto): object {
    return this.service.generateRaport(dto)
  }
}
