import { AnalyzerFetcher } from 'analyzer/AnalyzerFetcher'
import { ObfuscationHelper } from 'infrastructure/helper/ObfuscationHelper'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'
import { HttpService } from 'http/HttpService'
import { SiteChecker } from 'broken-link-checker'

export class BrokenLinksFetcher implements AnalyzerFetcher {
  async getFetchedData(dependencies) {
    const httpService: HttpService = dependencies[0]
    const shopPrefix = ObfuscationHelper.decrypt(CookieHelper.obtainCookie(httpService.getRequest(), 'pfx'))

    let results = {
      overallLinksCount: 0,
      pagesCount: 0,
      brokenLinks: [],
    }

    const siteCheckerPromise = new Promise((resolve, reject) => {
      new SiteChecker(
        { honorRobotExclusions: false, userAgent: 'SeoInsights.io BLC' },
        {
          junk: () => {
            results.overallLinksCount++
          },
          link: ({ broken: isBroken, http }) => {
            if (isBroken && http.response.statusCode !== 308) {
              results.brokenLinks.push(http.response.url)
            }

            results.overallLinksCount++
          },
          error: err => {
            reject(err)
          },
          page: () => {
            results.pagesCount++
          },
          end: () => {
            resolve(results)
          },
        },
      ).enqueue(`https://${shopPrefix}/`)
    })

    return siteCheckerPromise
  }
}
