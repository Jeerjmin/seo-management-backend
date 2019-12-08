import { Injectable, Req } from '@nestjs/common'
import { AnalyzerService } from './AnalyzerService'
import { AnalyzerParams } from './params/AnalyzerParams'
import { AnalyzerRaportDto } from './dto/AnalyzerRaportDto'
import { UserFacade } from 'user/UserFacade'

@Injectable()
export class AnalyzerFacade {
  constructor(private readonly service: AnalyzerService, private readonly userFacade: UserFacade) {}

  handleFetch(params: AnalyzerParams): object {
    return this.service.handleFetch(params)
  }

  generateRaport(@Req() request, dto: AnalyzerRaportDto): object {
    const raport = this.service.generateRaport(request, dto)
    this.userFacade.completeOnboarding(request)

    return raport
  }
}
