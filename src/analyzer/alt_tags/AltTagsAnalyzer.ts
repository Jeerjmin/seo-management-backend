import { AbstractAnalyzer } from '../AbstractAnalyzer'
import { AnalyzerFetcher } from 'analyzer/AnalyzerFetcher'
import { AltTagsFormatterType } from './AltTagsFormatterType'
import { AltTagsDefaultFormatter } from './AltTagsDefaultFormatter'
import { AltTagsFetcher } from './AltTagsFetcher'
import { AltTagsOverallFormatter } from './AltTagsOverallFormatter'
import { AltTagsUnityFormatter } from './AltTagsUnityFormatter'

export class AltTagsAnalyzer extends AbstractAnalyzer {
  getFormatters(): any {
    return {
      [AltTagsFormatterType.DEFAULT]: new AltTagsDefaultFormatter(),
      [AltTagsFormatterType.OVERALL]: new AltTagsOverallFormatter(),
      [AltTagsFormatterType.UNITY]: new AltTagsUnityFormatter(),
    }
  }

  getFetcher(): AnalyzerFetcher {
    return new AltTagsFetcher()
  }
}
