export interface Analyzer {
  getResults(force?: boolean): object
  getAttributes(...attrs: string[]): object
}
