export interface Analyzer {
  getResults(data: any): object
  getAttributes(data: any, ...attrs: string[]): object
}
