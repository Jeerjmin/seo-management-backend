import { floor } from 'lodash'
import { AnalyzerFormatter } from 'analyzer/AnalyzerFormatter'

export class BestPracticesDefaultFormatter implements AnalyzerFormatter {
  format(data: any) {
    const lighthouse = data.lighthouseResult

    return {
      'Best Practices Score': floor(lighthouse.categories['best-practices'].score * 100, 2),
      'Console errors':
        lighthouse.audits['errors-in-console'].details.items.length === 0
          ? 'No'
          : lighthouse.audits['errors-in-console'].details.items.length + ' errors found',
      'Avoids deprecated APIs': this.translateBinaryBoolean(lighthouse.audits.deprecations.score),
      'No vulnerable libraries': lighthouse.audits['no-vulnerable-libraries'].displayValue || 'No',
      'Allows users to paste into password fields': this.translateBinaryBoolean(
        lighthouse.audits['password-inputs-can-be-pasted-into'].score,
      ),
      'Displays images with correct aspect ratio': this.translateBinaryBoolean(
        lighthouse.audits['image-aspect-ratio'].score,
      ),
      'Avoids links to cross-origin destinations': this.translateBinaryBoolean(
        lighthouse.audits['external-anchors-use-rel-noopener'].score,
      ),
      'Uses HTTPS': this.translateBinaryBoolean(lighthouse.audits['is-on-https'].score),
    }
  }

  private translateBinaryBoolean(value) {
    return value >= 1 ? 'Yes' : 'No'
  }
}
