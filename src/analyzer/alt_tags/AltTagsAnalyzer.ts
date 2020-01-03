import { AbstractAnalyzer } from '../AbstractAnalyzer'
import { AnalyzerFetcher } from 'analyzer/AnalyzerFetcher'
import { AltTagsFormatterType } from './AltTagsFormatterType'
import { AltTagsDefaultFormatter } from './AltTagsDefaultFormatter'
import { AltTagsFetcher } from './AltTagsFetcher'
import { AltTagsOverallFormatter } from './AltTagsOverallFormatter'
import { AltTagsUnityFormatter } from './AltTagsUnityFormatter'
import { AltTagsOverrideFormatter } from './AltTagsOverrideFormatter'

export class AltTagsAnalyzer extends AbstractAnalyzer {
  getFormatters(): any {
    return {
      [AltTagsFormatterType.DEFAULT]: new AltTagsDefaultFormatter(),
      [AltTagsFormatterType.OVERALL]: new AltTagsOverallFormatter(),
      [AltTagsFormatterType.UNITY]: new AltTagsUnityFormatter(),
      [AltTagsFormatterType.OVERRIDE]: new AltTagsOverrideFormatter(),
    }
  }

  getFetcher(): AnalyzerFetcher {
    return new AltTagsFetcher()
  }
}
