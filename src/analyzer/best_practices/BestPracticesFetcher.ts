import { AnalyzerFetcher } from 'analyzer/AnalyzerFetcher'
import { HttpService } from 'http/HttpService'
import { ObfuscationHelper } from 'infrastructure/helper/ObfuscationHelper'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'
import { ConfigService } from 'config/ConfigService'

export class BestPracticesFetcher implements AnalyzerFetcher {
  async getFetchedData(dependencies): Promise<object> {
    const httpService: HttpService = dependencies[0]
    const configService: ConfigService = dependencies[1]

    const shopPrefix = ObfuscationHelper.decrypt(CookieHelper.obtainCookie(httpService.getRequest(), 'pfx'))
    const apiUrl = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed')

    apiUrl.searchParams.append('url', `https://${shopPrefix}/`)
    apiUrl.searchParams.append('category', 'best-practices')
    apiUrl.searchParams.append('strategy', 'desktop')
    apiUrl.searchParams.append('key', configService.get('GOOGLE_INSIGHTS_KEY'))

    const results = await httpService.get(apiUrl.toString())
    return results.data
  }
}
