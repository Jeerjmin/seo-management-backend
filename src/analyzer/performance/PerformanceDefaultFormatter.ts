import { AnalyzerFormatter } from 'analyzer/AnalyzerFormatter'

export class PerformanceDefaultFormatter implements AnalyzerFormatter {
  format(data: any) {
    return data
  }
}
