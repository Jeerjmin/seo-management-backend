import { AnalyzerFetcher } from 'analyzer/AnalyzerFetcher'
import { HttpService } from 'http/HttpService'
import { ObfuscationHelper } from 'infrastructure/helper/ObfuscationHelper'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'
import { floor } from 'lodash'

export class BestPracticesFetcher implements AnalyzerFetcher {
  async getFetchedData(dependencies): Promise<object> {
    const httpService: HttpService = dependencies[0]

    const shopPrefix = ObfuscationHelper.decrypt(CookieHelper.obtainCookie(httpService.getRequest(), 'pfx'))
    const apiUrl = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed')

    apiUrl.searchParams.append('url', `https://${shopPrefix}/`)
    apiUrl.searchParams.append('category', 'best-practices')
    apiUrl.searchParams.append('strategy', 'desktop')
    apiUrl.searchParams.append('key', 'AIzaSyAt8FEO9lONN-9EacBkVAM6SnbqHtfi-o0')

    const results: any = await httpService.get(apiUrl.toString())
    const lighthouse = results.data.lighthouseResult

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
