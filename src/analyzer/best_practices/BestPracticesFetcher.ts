import { AnalyzerFetcher } from 'analyzer/AnalyzerFetcher'
import { HttpService } from 'http/HttpService'
import { ObfuscationHelper } from 'infrastructure/helper/ObfuscationHelper'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'

export class BestPracticesFetcher implements AnalyzerFetcher {
  async getFetchedData(dependencies): Promise<object> {
    const httpService: HttpService = dependencies[0]

    const shopPrefix = ObfuscationHelper.decrypt(CookieHelper.obtainCookie(httpService.getRequest(), 'pfx'))
    const apiUrl = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed')

    apiUrl.searchParams.append('url', `https://${shopPrefix}/`)
    apiUrl.searchParams.append('category', 'best-practices')
    apiUrl.searchParams.append('strategy', 'desktop')
    apiUrl.searchParams.append('key', 'AIzaSyAt8FEO9lONN-9EacBkVAM6SnbqHtfi-o0')

    const results = await httpService.get(apiUrl.toString())
    return results.data
  }
}
