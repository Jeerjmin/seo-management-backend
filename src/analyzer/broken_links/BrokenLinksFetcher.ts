import { AnalyzerFetcher } from 'analyzer/AnalyzerFetcher'
import { HtmlUrlChecker } from 'broken-link-checker'
import { BrokenLinkScanType } from './BrokenLinkScanType'
import { BrokenLinkSourceFactory } from './BrokenLinkSourceFactory'

export class BrokenLinksFetcher implements AnalyzerFetcher {
  async getFetchedData(dependencies) {
    const {
      shopPrefix,
      scanType,
      specificPageUrl,
    }: {
      shopPrefix: string
      scanType: BrokenLinkScanType
      specificPageUrl: string
    } = dependencies

    const results = {
      overallLinksCount: 0,
      pagesCount: 0,
      brokenLinks: [],
    }

    const siteCheckerPromise = new Promise((resolve, _) => {
      new HtmlUrlChecker(
        { honorRobotExclusions: false, userAgent: 'SeoInsights.io BLC' },
        {
          junk: () => {
            results.overallLinksCount++
          },
          link: ({ url, base, html, broken: isBroken }) => {
            if (isBroken) {
              results.brokenLinks.push({
                url: url.original,
                source: BrokenLinkSourceFactory.getSource(html, shopPrefix),
                text: html.text,
                origin: base.original,
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
      ).enqueue(scanType === BrokenLinkScanType.SPECIFIC_PAGE ? specificPageUrl : `https://${shopPrefix}/`)
    })

    return siteCheckerPromise
  }
}
