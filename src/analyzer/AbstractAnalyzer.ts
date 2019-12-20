import { pick } from 'lodash'
import { Analyzer } from './Analyzer'
import { AnalyzerFetcher } from './AnalyzerFetcher'

export abstract class AbstractAnalyzer implements Analyzer {
  async getResults(
    formatterType: string | number,
    data: any,
    dependencies: any[],
    ...attrs: Array<string>
  ): Promise<any> {
    const formatter = this.getFormatters()[formatterType]
    const fetchedData = data ? data : await this.getFetcher().getFetchedData(dependencies)

    const computeResults = await formatter.format(fetchedData)
    if (attrs.length === 0 || attrs.includes(undefined)) {
      return computeResults
    }

    return pick(computeResults, attrs)
  }

  abstract getFetcher(): AnalyzerFetcher
  abstract getFormatters(): any
}
