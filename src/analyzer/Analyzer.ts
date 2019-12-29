export interface Analyzer {
  getResults(formatterType: string | number, data: any, dependencies: any, ...attrs: Array<string>): Promise<any>
  getFormatters(): any
}
