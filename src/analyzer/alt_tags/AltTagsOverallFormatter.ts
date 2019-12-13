import { AnalyzerFormatter } from 'analyzer/AnalyzerFormatter'
import { AltTagsDefaultFormatter } from './AltTagsDefaultFormatter'

export class AltTagsOverallFormatter extends AltTagsDefaultFormatter implements AnalyzerFormatter {
  format(data: any): any {
    const { overallAltTagsCount, overallFilledAltTagsCount, overallFilledAltTagsPercent } = super.format(data)

    return {
      'Alt tags count': overallAltTagsCount,
      'Filled alt tags count': overallFilledAltTagsCount,
      'Accessibility Score': overallFilledAltTagsPercent,
    }
  }
}
