import { pick } from 'lodash'
import { Analyzer } from './Analyzer'

export abstract class AbstractAnalyzer implements Analyzer {
  protected results: object
  private computed: boolean

  protected compute(): any {
    this.computed = true
    return this.results
  }

  getResults(force: boolean = false): object {
    return this.computed && !force ? this.results : this.compute()
  }

  getAttributes(...attrs: string[]): object | undefined {
    if (this.computed) {
      return pick(this.results, attrs)
    }

    this.compute()
    return this.getAttributes(...attrs)
  }
}
