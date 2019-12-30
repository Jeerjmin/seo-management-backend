import { AnalyzerFetcher } from 'analyzer/AnalyzerFetcher'
import { HttpService } from 'http/HttpService'
import { UrlChecker, HtmlUrlChecker } from 'broken-link-checker'
import { BrokenLinkScanType } from './BrokenLinkScanType'
import { BrokenLinkSourceFactory } from './BrokenLinkSourceFactory'

export class BrokenLinksFetcher implements AnalyzerFetcher {
  async getFetchedData(dependencies) {
    const {
      shopPrefix,
      scanType,
    }: {
      shopPrefix: string
      scanType: BrokenLinkScanType
    } = dependencies

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
          link: ({ url, html, broken: isBroken }) => {
            console.log(url)
            if (isBroken) {
              results.brokenLinks.push({
                url: url.original,
                source: BrokenLinkSourceFactory.getSource(html, shopPrefix),
              })
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
