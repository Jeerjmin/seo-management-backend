import * as cheerio from 'cheerio'

export class FixerPayloadFactory {
  private constructor() {}

  static getPayload(result: any, templates: { overallTemplate: string; productTemplate: string }) {
    switch (result.type) {
      case 'PRODUCT': {
        return {
          product: {
            image: { src: result.src, alt: templates.productTemplate.replace('[product-title]', result.title) },
          },
        }
      }
      case 'PAGE': {
        return {
          page: {
            body_html: this.replaceAltTags(
              result.body_html,
              this.replaceSiteName(result.title, templates.overallTemplate),
            ),
          },
        }
      }
      case 'ARTICLE': {
        return {
          article: {
            body_html: this.replaceAltTags(
              result.body_html,
              this.replaceSiteName(result.title, templates.overallTemplate),
            ),
            summary_html: this.replaceAltTags(
              result.summary_html,
              this.replaceSiteName(result.title, templates.overallTemplate),
            ),
            image: { ...result.image, alt: this.replaceSiteName(result.title, templates.overallTemplate) },
          },
        }
      }
      case 'CUSTOM_COLLECTIONS': {
        return {
          custom_collection: {
            body_html: this.replaceAltTags(
              result.body_html,
              this.replaceSiteName(result.title, templates.overallTemplate),
            ),
            image: { ...result.image, alt: this.replaceSiteName(result.title, templates.overallTemplate) },
          },
        }
      }
      case 'SMART_COLLECTIONS': {
        return {
          smart_collection: {
            body_html: this.replaceAltTags(
              result.body_html,
              this.replaceSiteName(result.title, templates.overallTemplate),
            ),
            image: { ...result.image, alt: this.replaceSiteName(result.title, templates.overallTemplate) },
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
    if (!htmlContent) {
      return
    }

    const $ = cheerio.load(htmlContent, { xmlMode: true })
    $('img').removeAttr('alt')

    $('img').attr('alt', text)
    return $.html()
  }
}
