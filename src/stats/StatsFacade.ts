import { AnalyzerFacade } from 'analyzer/AnalyzerFacade'
import { StatsDto } from './StatsDto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class StatsFacade {
  constructor(private readonly analyzerFacade: AnalyzerFacade) {}

  async generateOverallStats(): Promise<StatsDto> {
    const { filledAltTagsPercent } = await this.analyzerFacade.handleFetch({
      type: 'ALT_TAGS',
      fields: 'filledAltTagsPercent',
    })

    return new StatsDto(filledAltTagsPercent, 0, 0)
  }
}
