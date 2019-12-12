import { AnalyzerFormatter } from 'analyzer/AnalyzerFormatter'
import { AltTagsDefaultFormatter } from './AltTagsDefaultFormatter'

export class AltTagsOverallFormatter extends AltTagsDefaultFormatter implements AnalyzerFormatter {
  format(data: any): any {
    const { overallAltTagsCount, overallFilledAltTagsCount, overallFilledAltTagsPercent } = super.format(data)

    return {
      overallAltTagsCount,
      overallFilledAltTagsCount,
      overallFilledAltTagsPercent,
    }
  }
}
