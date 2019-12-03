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

  getAttribute(attrKey: string): object | undefined {
    return this.computed ? this.results[attrKey] : undefined
  }
}
