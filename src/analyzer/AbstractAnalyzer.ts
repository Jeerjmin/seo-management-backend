import { Analyzer } from './Analyzer'

export abstract class AbstractAnalyzer implements Analyzer {
  protected results: object
  private computed: boolean

  protected compute(): any {
    this.computed = true
    return this.results
  }

  getResults(force: boolean = false): object {
    if (this.computed && !force) {
      console.log('I was already computed')
      return this.results
    }

    console.log('Computed first time')
    return this.compute()
  }

  getAttribute(attrKey: string): object | undefined {
    if (this.computed) {
      return this.results[attrKey]
    }

    return undefined
  }
}
