import { AnalyzerFetcher } from 'analyzer/AnalyzerFetcher'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'
import { HttpService } from 'http/HttpService'
import { ObfuscationHelper } from 'infrastructure/helper/ObfuscationHelper'
import { ConfigService } from 'config/ConfigService'

export class PerformanceFetcher implements AnalyzerFetcher {
  async getFetchedData(dependencies): Promise<object> {
    const httpService: HttpService = dependencies[0]
    const configService: ConfigService = dependencies[1]

    const shopPrefix = ObfuscationHelper.decrypt(CookieHelper.obtainCookie(httpService.getRequest(), 'pfx'))
    const apiUrl = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed')

    apiUrl.searchParams.append('url', `https://${shopPrefix}/`)
    apiUrl.searchParams.append('category', 'performance')
    apiUrl.searchParams.append('strategy', 'desktop')
    apiUrl.searchParams.append('key', configService.get('GOOGLE_INSIGHTS_KEY'))

    const results: any = await httpService.get(apiUrl.toString())
    return results.data
  }
}
