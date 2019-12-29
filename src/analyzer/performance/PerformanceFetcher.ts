import { AnalyzerFetcher } from 'analyzer/AnalyzerFetcher'
import { HttpService } from 'http/HttpService'
import { ConfigService } from 'config/ConfigService'

export class PerformanceFetcher implements AnalyzerFetcher {
  async getFetchedData(dependencies): Promise<object> {
    const {
      configService,
      shopPrefix,
      session,
    }: { configService: ConfigService; shopPrefix: string; session: string } = dependencies
    const httpService: HttpService = HttpService.create(shopPrefix, session)

    const apiUrl = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed')

    apiUrl.searchParams.append('url', `https://${shopPrefix}/`)
    apiUrl.searchParams.append('category', 'performance')
    apiUrl.searchParams.append('strategy', 'desktop')
    apiUrl.searchParams.append('key', configService.get('GOOGLE_INSIGHTS_KEY'))

    const results: any = await httpService.get(apiUrl.toString())
    return results.data
  }
}
