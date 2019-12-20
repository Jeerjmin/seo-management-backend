import { AbstractAnalyzer } from 'analyzer/AbstractAnalyzer'
import { AnalyzerFetcher } from 'analyzer/AnalyzerFetcher'
import { AppsFetcher } from './AppsFetcher'
import { AppsFormatterType } from './AppsFormatterType'
import { AppsDefaultFormatter } from './AppsDefaultFormatter'

export class AppsAnalyzer extends AbstractAnalyzer {
  getFetcher(): AnalyzerFetcher {
    return new AppsFetcher()
  }

  getFormatters() {
    return {
      [AppsFormatterType.DEFAULT]: new AppsDefaultFormatter(),
    }
  }
}
