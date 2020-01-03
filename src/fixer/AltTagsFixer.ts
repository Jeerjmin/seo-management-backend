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
      session,
      shopPrefix,
      overallTemplate,
      productTemplate,
      override,
    }: {
      session: string
      shopPrefix: string
      overallTemplate: string
      productTemplate: string
      override: boolean
    } = args
    const httpService: HttpService = HttpService.create(shopPrefix, session)
    const shopName = shopPrefix.replace('.myshopify.com', '')

    const results = await this.getDataToFix(session, shopPrefix, override)
    results.forEach(result => {
      httpService
        .put(result.apiUrl, {
          id: result.id,
          ...FixerPayloadFactory.getPayload(result, {
            productTemplate: productTemplate.replace('[shop-name]', shopName),
            overallTemplate: overallTemplate.replace('[shop-name]', shopName),
          }),
        })
        .catch(error => new Error(error))
    })
  }

  private async getDataToFix(session: string, shopPrefix: string, override: boolean) {
    return this.analyzerFacade.getResults(
      AnalyzerType.ALT_TAGS,
      override ? AltTagsFormatterType.OVERRIDE : AltTagsFormatterType.UNITY,
      undefined,
      {
        session,
        shopPrefix,
      },
    )
  }
}
