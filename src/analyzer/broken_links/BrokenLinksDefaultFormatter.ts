import { AnalyzerFormatter } from 'analyzer/AnalyzerFormatter'
export class BrokenLinksDefaultFormatter implements AnalyzerFormatter {
  format(data) {
    return [...data.brokenLinks]
  }
}
