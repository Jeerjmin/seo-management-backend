import { AnalyzerFormatter } from 'analyzer/AnalyzerFormatter'

export class BestPracticesDefaultFormatter implements AnalyzerFormatter {
  format(data: any) {
    return data
  }
}
