import { AbstractAnalyzer } from 'analyzer/AbstractAnalyzer'
import { AnalyzerFetcher } from 'analyzer/AnalyzerFetcher'
import { BestPracticesFetcher } from './BestPracticesFetcher'
import { BestPracticesFormatterType } from './BestPracticesFormatterType'
import { BestPracticesDefaultFormatter } from './BestPracticesDefaultFormatter'

export class BestPracticesAnalyzer extends AbstractAnalyzer {
  getFormatters() {
    return {
      [BestPracticesFormatterType.DEFAULT]: new BestPracticesDefaultFormatter(),
    }
  }

  getFetcher(): AnalyzerFetcher {
    return new BestPracticesFetcher()
  }
}
