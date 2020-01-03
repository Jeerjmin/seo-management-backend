import * as cheerio from 'cheerio'

export class FixerPayloadFactory {
  private constructor() {}

  static getPayload(result: any, template) {
    switch (result.type) {
      case 'PRODUCT': {
        return { product: { image: { src: result.src, alt: template.replace('[product-title]', result.title) } } }
      }
      case 'PAGE': {
        return {
          page: { body_html: this.replaceAltTags(result.body_html, this.replaceSiteName(result.title, template)) },
        }
      }
      case 'ARTICLE': {
        return {
          article: {
            body_html: this.replaceAltTags(result.body_html, this.replaceSiteName(result.title, template)),
            summary_html: this.replaceAltTags(result.summary_html, this.replaceSiteName(result.title, template)),
            image: { ...result.image, alt: this.replaceSiteName(result.title, template) },
          },
        }
      }
      case 'CUSTOM_COLLECTIONS': {
        return {
          custom_collection: {
            body_html: this.replaceAltTags(result.body_html, this.replaceSiteName(result.title, template)),
            image: { ...result.image, alt: this.replaceSiteName(result.title, template) },
          },
        }
      }
      case 'SMART_COLLECTIONS': {
        return {
          smart_collection: {
            body_html: this.replaceAltTags(result.body_html, this.replaceSiteName(result.title, template)),
            image: { ...result.image, alt: this.replaceSiteName(result.title, template) },
          },
        }
      }
      default: {
        throw new Error(`Payload for type ${result.type} does not exist`)
      }
    }
  }

  private static replaceSiteName(siteName: string, template: string): string {
    return template.replace('[page-title]', siteName)
  }

  private static replaceAltTags(htmlContent: string, text: string) {
    const $ = cheerio.load(htmlContent, { xmlMode: true })
    $('img').removeAttr('alt')

    $('img').attr('alt', text)
    return $.html()
  }
}
