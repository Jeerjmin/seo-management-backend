import { Fixer } from './Fixer'
import { AnalyzerFacade } from 'analyzer/AnalyzerFacade'
import { AnalyzerType } from 'analyzer/AnalyzerType'
import { AltTagsFormatterType } from 'analyzer/alt_tags/AltTagsFormatterType'
import { HttpService } from 'http/HttpService'
import { FixerPayloadFactory } from './FixerPayloadFactory'

export class AltTagsFixer implements Fixer {
  constructor(private readonly analyzerFacade: AnalyzerFacade) {}

  async fix(args: any): Promise<void> {
    const {
      userId,
      session,
      shopPrefix,
      jobCallback,
      template,
    }: { userId: number; session: string; shopPrefix: string; jobCallback: Function; template: string } = args
    const httpService: HttpService = HttpService.create(shopPrefix, session)
    const shopName = shopPrefix.replace('.myshopify.com', '')

    const replacedTemplate = template.replace('[shop-name]', shopName)
    const results = await this.getDataToFix(session, shopPrefix)

    results.forEach(result => {
      jobCallback()
      httpService
        .put(result.apiUrl, { id: result.id, ...FixerPayloadFactory.getPayload(result, replacedTemplate) })
        .catch(error => new Error(error))
    })
  }

  private async getDataToFix(session: string, shopPrefix: string) {
    return this.analyzerFacade.getResults(AnalyzerType.ALT_TAGS, AltTagsFormatterType.UNITY, undefined, {
      session,
      shopPrefix,
    })
  }
}
