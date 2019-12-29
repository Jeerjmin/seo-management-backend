import { AnalyzerFetcher } from 'analyzer/AnalyzerFetcher'
import { HttpService } from 'http/HttpService'
import { parseScript } from 'shift-parser'
import * as cheerio from 'cheerio'
import * as parse from 'url-parse'

export class AppsFetcher implements AnalyzerFetcher {
  async getFetchedData(dependencies) {
    const { shopPrefix, session }: { shopPrefix: string; session: string } = dependencies
    const httpService: HttpService = HttpService.create(shopPrefix, session)

    const response = await httpService.get(`https://${shopPrefix}/`)
    const $ = cheerio.load(response.data)

    const appsListScript = $("script:contains('function asyncLoad()')").html()
    if (!appsListScript) {
      return new Set()
    }

    const parsedAppsScript = parseScript(appsListScript)
    const distinctAppsUrls = new Set()

    parsedAppsScript.statements[0].expression.callee.body.statements[0].body.statements[0].declaration.declarators[0].init.elements.forEach(
      element => {
        const urlHostname = parse(element.value, true).hostname
        distinctAppsUrls.add(urlHostname)
      },
    )

    return distinctAppsUrls
  }
}
