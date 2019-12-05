import { pick } from 'lodash'
import { Analyzer } from './Analyzer'

export abstract class AbstractAnalyzer implements Analyzer {
  protected results: object

  protected compute(data: any): any {
    this.results = data
    return this.results
  }

  getResults(data: any): object {
    return this.compute(data)
  }

  getAttributes(data: any, ...attrs: string[]): object {
    this.compute(data)
    return pick(this.results, attrs)
  }
}
