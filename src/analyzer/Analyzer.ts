export interface Analyzer {
  getResults(data: any, force?: boolean): object
  getAttributes(data: any, ...attrs: string[]): object
}
