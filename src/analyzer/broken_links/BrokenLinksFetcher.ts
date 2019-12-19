import { AnalyzerFetcher } from 'analyzer/AnalyzerFetcher'
import { ObfuscationHelper } from 'infrastructure/helper/ObfuscationHelper'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'
import { HttpService } from 'http/HttpService'
import { UrlChecker, HtmlUrlChecker } from 'broken-link-checker'
import { BrokenLinkScanType } from './BrokenLinkScanType'

export class BrokenLinksFetcher implements AnalyzerFetcher {
  async getFetchedData(dependencies) {
    const httpService: HttpService = dependencies[0]
    const shopPrefix = ObfuscationHelper.decrypt(CookieHelper.obtainCookie(httpService.getRequest(), 'pfx'))

    const { scanType } = dependencies[2]

    const results = {
      overallLinksCount: 0,
      pagesCount: 0,
      brokenLinks: [],
    }

    const SCANNER_TYPE = {
      [BrokenLinkScanType.WIDE]: HtmlUrlChecker,
      [BrokenLinkScanType.HOME_PAGE]: UrlChecker,
    }

    const siteCheckerPromise = new Promise((resolve, _) => {
      new SCANNER_TYPE[scanType](
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
            resolve({ items: [] })
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
