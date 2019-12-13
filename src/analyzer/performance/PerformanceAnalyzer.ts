import { AbstractAnalyzer } from 'analyzer/AbstractAnalyzer'
import { AnalyzerFetcher } from 'analyzer/AnalyzerFetcher'
import { PerformanceFormatterType } from './PerformanceFormatterType'
import { PerformanceDefaultFormatter } from './PerformanceDefaultFormatter'
import { PerformanceFetcher } from './PerformanceFetcher'

export class PerformanceAnalyzer extends AbstractAnalyzer {
  getFormatters() {
    return {
      [PerformanceFormatterType.DEFAULT]: new PerformanceDefaultFormatter(),
    }
  }

  getFetcher(): AnalyzerFetcher {
    return new PerformanceFetcher()
  }
}
