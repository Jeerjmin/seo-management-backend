import { AbstractAnalyzer } from './AbstractAnalyzer'

export class AltTagsAnalyzer extends AbstractAnalyzer {
  protected compute() {
    this.results = { altTags: ['test1', 'test2', 'test3'] }

    return super.compute()
  }
}
