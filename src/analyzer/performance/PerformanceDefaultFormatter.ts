import { AnalyzerFormatter } from 'analyzer/AnalyzerFormatter'
import { floor } from 'lodash'

export class PerformanceDefaultFormatter implements AnalyzerFormatter {
  format(data: any) {
    const lighthouse = data.lighthouseResult

    return {
      'Performance Score': floor(lighthouse.categories.performance.score * 100, 2),
      'First Contentful Paint': lighthouse.audits['first-contentful-paint'].displayValue,
      'Speed Index': lighthouse.audits['speed-index'].displayValue,
      'Time To Interactive': lighthouse.audits.interactive.displayValue,
      'First Meaningful Paint': lighthouse.audits['first-meaningful-paint'].displayValue,
      'First CPU Idle': lighthouse.audits['first-cpu-idle'].displayValue,
      'Estimated Input Latency': lighthouse.audits['estimated-input-latency'].displayValue,
    }
  }
}
