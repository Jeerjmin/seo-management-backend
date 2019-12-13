import { AnalyzerFetcher } from 'analyzer/AnalyzerFetcher'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'
import { HttpService } from 'http/HttpService'
import { ObfuscationHelper } from 'infrastructure/helper/ObfuscationHelper'
import { floor } from 'lodash'

export class PerformanceFetcher implements AnalyzerFetcher {
  async getFetchedData(dependencies): Promise<object> {
    const httpService: HttpService = dependencies[0]

    const shopPrefix = ObfuscationHelper.decrypt(CookieHelper.obtainCookie(httpService.getRequest(), 'pfx'))
    const apiUrl = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed')

    apiUrl.searchParams.append('url', `https://${shopPrefix}/`)
    apiUrl.searchParams.append('category', 'performance')
    apiUrl.searchParams.append('strategy', 'desktop')
    apiUrl.searchParams.append('key', 'AIzaSyAt8FEO9lONN-9EacBkVAM6SnbqHtfi-o0')

    const results: any = await httpService.get(apiUrl.toString())
    const lighthouse = results.data.lighthouseResult

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
