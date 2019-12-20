import { AnalyzerFormatter } from 'analyzer/AnalyzerFormatter'

export class AppsDefaultFormatter implements AnalyzerFormatter {
  format(data: any): any {
    return {
      apps: [...data.values()],
    }
  }
}
