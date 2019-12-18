import { AbstractAnalyzer } from 'analyzer/AbstractAnalyzer'
import { AnalyzerFetcher } from 'analyzer/AnalyzerFetcher'
import { BrokenLinksFetcher } from './BrokenLinksFetcher'
import { BrokenLinksFormatterType } from './BrokenLinksFormatterType'
import { BrokenLinksDefaultFormatter } from './BrokenLinksDefaultFormatter'

export class BrokenLinksAnalyzer extends AbstractAnalyzer {
  getFetcher(): AnalyzerFetcher {
    return new BrokenLinksFetcher()
  }

  getFormatters() {
    return {
      [BrokenLinksFormatterType.DEFAULT]: new BrokenLinksDefaultFormatter(),
    }
  }
}
