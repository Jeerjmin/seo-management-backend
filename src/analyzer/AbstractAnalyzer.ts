import { pick } from 'lodash'
import { Analyzer } from './Analyzer'

export abstract class AbstractAnalyzer implements Analyzer {
  protected results: object
  private computed: boolean

  protected compute(data: any): any {
    this.results = data
    this.computed = true

    return this.results
  }

  getResults(data: any, force: boolean = false): object {
    return this.computed && !force ? this.results : this.compute(data)
  }

  getAttributes(data: any, ...attrs: string[]): object | undefined {
    if (this.computed) {
      return pick(this.results, attrs)
    }

    this.compute(data)
    return this.getAttributes(data, ...attrs)
  }
}
