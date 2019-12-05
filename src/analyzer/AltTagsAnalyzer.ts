import { AbstractAnalyzer } from './AbstractAnalyzer'
import { ArrayHelper } from 'infrastructure/helper/ArrayHelper'
import { pick, isEmpty, floor } from 'lodash'
import * as cheerio from 'cheerio'

export class AltTagsAnalyzer extends AbstractAnalyzer {
  protected async compute(dataPromise: Promise<any>) {
    let data = await dataPromise
    const { products, pages, articles, customCollections, smartCollections } = data

    data = {
      products: ArrayHelper.combineArrays(products.map(product => product.images)).map(image =>
        pick(image, 'id', 'product_id', 'alt', 'src'),
      ),
      pages: pages.map(page => pick(page, 'id', 'title', 'body_html')),
      articles: articles.map(article => ({
        id: article.id,
        body_html: article.body_html,
        summary_html: article.summary_html,
        image: this.pickImage(article.image),
      })),
      customCollections: this.mapCollection(customCollections),
      smartCollections: this.mapCollection(smartCollections),
    }

    let altTagsCount = 0
    let filledAltTagsCount = 0

    for (const product of data.products) {
      altTagsCount++
      if (this.isAltTagPresent(product.alt)) {
        filledAltTagsCount++
      }
    }

    for (const page of data.pages) {
      this.eachImage(page.body_html, element => {
        altTagsCount++
        if (this.isAltTagPresent(element.attribs.alt)) {
          filledAltTagsCount++
        }
      })
    }

    for (const article of data.articles) {
      this.eachImage(article.body_html, element => {
        altTagsCount++
        if (this.isAltTagPresent(element.attribs.alt)) {
          filledAltTagsCount++
        }
      })

      this.eachImage(article.summary_html, element => {
        altTagsCount++
        if (this.isAltTagPresent(element.attribs.alt)) {
          filledAltTagsCount++
        }
      })

      if (!isEmpty(article.image)) {
        altTagsCount++
        if (this.isAltTagPresent(article.image.alt)) {
          filledAltTagsCount++
        }
      }
    }

    for (const collection of data.customCollections) {
      this.eachImage(collection.body_html, element => {
        altTagsCount++
        if (this.isAltTagPresent(element.attribs.alt)) {
          filledAltTagsCount++
        }
      })

      if (!isEmpty(collection.image)) {
        altTagsCount++
        if (this.isAltTagPresent(collection.image.alt)) {
          filledAltTagsCount++
        }
      }
    }

    for (const collection of data.smartCollections) {
      this.eachImage(collection.body_html, element => {
        altTagsCount++
        if (this.isAltTagPresent(element.attribs.alt)) {
          filledAltTagsCount++
        }
      })

      if (!isEmpty(collection.image)) {
        altTagsCount++
        if (this.isAltTagPresent(collection.image.alt)) {
          filledAltTagsCount++
        }
      }
    }

    return super.compute({
      altTagsCount,
      filledAltTagsCount,
      blankAltTagsCount: altTagsCount - filledAltTagsCount,
      filledAltTagsPercent: floor((filledAltTagsCount * 100) / altTagsCount, 2),
    })
  }

  private eachImage(htmlContent, callback) {
    if (htmlContent === null) return

    const $ = cheerio.load(htmlContent)
    $('img').each((_, element) => callback(element))
  }

  private isAltTagPresent(altTagValue: string): boolean {
    return altTagValue !== null && altTagValue !== ''
  }

  private mapCollection(collectionToMap) {
    return collectionToMap.map(collection => ({
      id: collection.id,
      title: collection.title,
      body_html: collection.body_html,
      image: this.pickImage(collection.image),
    }))
  }

  private pickImage(image) {
    return image
      ? {
          src: image.src,
          alt: image.alt,
        }
      : {}
  }
}
