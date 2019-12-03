export interface Analyzer {
  getResults(force?: boolean): object
  getAttribute(attrKey: string): object
}
