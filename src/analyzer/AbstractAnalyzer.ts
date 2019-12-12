import { pick } from 'lodash'
import { Analyzer } from './Analyzer'
import { AnalyzerFetcher } from './AnalyzerFetcher'

export abstract class AbstractAnalyzer implements Analyzer {
  async getResults(formatterType: string | number, ...attrs: Array<string>): Promise<any> {
    const formatter = this.getFormatters()[formatterType]

    const fetchedData = await this.getFetcher().getFetchedData()
    const computeResults = await formatter.format(fetchedData)

    if (attrs.length === 0) {
      return computeResults
    }

    return pick(computeResults, attrs)
  }

  abstract getFetcher(): AnalyzerFetcher
  abstract getFormatters(): any
}
