export interface Analyzer {
  getResults(formatterType?: string | number, ...attrs: Array<string>): Promise<any>
  getFormatters(): any
}
