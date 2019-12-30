import { Fixer } from './Fixer'
import { AnalyzerFacade } from 'analyzer/AnalyzerFacade'
import { AnalyzerType } from 'analyzer/AnalyzerType'
import { AltTagsFormatterType } from 'analyzer/alt_tags/AltTagsFormatterType'
import { HttpService } from 'http/HttpService'
import { FixerPayloadFactory } from './FixerPayloadFactory'

export class AltTagsFixer implements Fixer {
  constructor(private readonly analyzerFacade: AnalyzerFacade) {}

  async fix(args: any): Promise<void> {
    const { userId, session, shopPrefix }: { userId: number; session: string; shopPrefix: string } = args
    const httpService: HttpService = HttpService.create(shopPrefix, session)

    const shopName = shopPrefix.replace('.myshopify.com', '')
    const results = await this.getDataToFix(session, shopPrefix)

    results.forEach(result => {
      httpService
        .put(result.apiUrl, { id: result.id, ...FixerPayloadFactory.getPayload(result, shopName) })
        .catch(error => {
          console.error(error.config.data)
          console.error(error.response.data)
        })
    })
  }

  private async getDataToFix(session: string, shopPrefix: string) {
    return this.analyzerFacade.getResults(AnalyzerType.ALT_TAGS, AltTagsFormatterType.UNITY, undefined, {
      session,
      shopPrefix,
    })
  }
}
