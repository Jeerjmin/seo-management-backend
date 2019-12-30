import * as cheerio from 'cheerio'

export class FixerPayloadFactory {
  private constructor() {}

  static getPayload(result: any, shopName: string) {
    switch (result.type) {
      case 'PRODUCT': {
        return { product: { image: { src: result.src, alt: `${result.title} - ${shopName}` } } }
      }
      case 'PAGE': {
        return { page: { body_html: this.replaceAltTags(result.body_html, `${result.title} - ${shopName}`) } }
      }
      case 'ARTICLE': {
        return {
          article: {
            body_html: this.replaceAltTags(result.body_html, `${result.title} - ${shopName}`),
            summary_html: this.replaceAltTags(result.summary_html, `${result.title} - ${shopName}`),
            image: { ...result.image, alt: `${result.title} - ${shopName}` },
          },
        }
      }
      case 'CUSTOM_COLLECTIONS': {
        return {
          custom_collection: {
            body_html: this.replaceAltTags(result.body_html, `${result.title} - ${shopName}`),
            image: { ...result.image, alt: `${result.title} - ${shopName}` },
          },
        }
      }
      case 'SMART_COLLECTIONS': {
        return {
          smart_collection: {
            body_html: this.replaceAltTags(result.body_html, `${result.title} - ${shopName}`),
            image: { ...result.image, alt: `${result.title} - ${shopName}` },
          },
        }
      }
      default: {
        throw new Error(`Payload for type ${result.type} does not exist`)
      }
    }
  }

  private static replaceAltTags(htmlContent: string, text: string) {
    const $ = cheerio.load(htmlContent, { xmlMode: true })
    $('img').removeAttr('alt')

    $('img').attr('alt', text)
    return $.html()
  }
}
