import { AbstractAnalyzer } from '../AbstractAnalyzer'
import { AnalyzerFetcher } from 'analyzer/AnalyzerFetcher'
import { AltTagsFormatterType } from './AltTagsFormatterType'
import { AltTagsDefaultFormatter } from './AltTagsDefaultFormatter'
import { AltTagsFetcher } from './AltTagsFetcher'
import { HttpService } from 'http/HttpService'
import { AltTagsOverallFormatter } from './AltTagsOverallFormatter'

export class AltTagsAnalyzer extends AbstractAnalyzer {
  constructor(private readonly httpService: HttpService) {
    super()
  }

  getFormatters(): any {
    return {
      [AltTagsFormatterType.DEFAULT]: new AltTagsDefaultFormatter(),
      [AltTagsFormatterType.OVERALL]: new AltTagsOverallFormatter(),
    }
  }

  getFetcher(): AnalyzerFetcher {
    return new AltTagsFetcher(this.httpService)
  }
}
