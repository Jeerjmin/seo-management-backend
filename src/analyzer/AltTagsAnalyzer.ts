import { AbstractAnalyzer } from './AbstractAnalyzer'
import { pick, isEmpty, floor } from 'lodash'
import * as cheerio from 'cheerio'

export class AltTagsAnalyzer extends AbstractAnalyzer {
  getDefaultAttributes() {
    return ['overallAltTagsCount', 'overallFilledAltTagsCount', 'overallFilledAltTagsPercent']
  }

  protected async compute(dataPromise: Promise<any>) {
    const data = await dataPromise
    const { products, pages, articles, customCollections, smartCollections } = data

    let formattedProducts = []
    let formattedPages = []
    let formattedArticles = []

    let overallAltTagsCount = 0
    let overallFilledAltTagsCount = 0

    products.forEach(product => {
      let altTagsCount = 0
      let filledAltTagsCount = 0

      const images = product.images.map(image => {
        const altTags = this.countAltTags(image)

        altTagsCount += altTags.altTagsCount
        filledAltTagsCount += altTags.filledAltTagsCount

        return pick(image, 'id', 'product_id', 'alt', 'src')
      })

      overallAltTagsCount += altTagsCount
      overallFilledAltTagsCount += filledAltTagsCount

      formattedProducts = [
        ...formattedProducts,
        {
          title: product.title,
          images,
          ...this.altTagsArray(altTagsCount, filledAltTagsCount),
        },
      ]
    })

    pages.forEach(page => {
      const altTags = this.countAltTags(null, page.body_html)

      overallAltTagsCount += altTags.altTagsCount
      overallFilledAltTagsCount += altTags.filledAltTagsCount

      formattedPages = [
        ...formattedPages,
        {
          ...pick(page, 'id', 'title', 'body_html'),
          ...this.altTagsArray(altTags.altTagsCount, altTags.filledAltTagsCount),
        },
      ]
    })

    articles.forEach(article => {
      const altTags = this.countAltTags(article.image, article.body_html, article.summary_html)

      overallAltTagsCount += altTags.altTagsCount
      overallFilledAltTagsCount += altTags.filledAltTagsCount

      formattedArticles = [
        ...formattedArticles,
        {
          id: article.id,
          body_html: article.body_html,
          summary_html: article.summary_html,
          title: article.title,
          image: this.pickImage(article.image),
          ...this.altTagsArray(altTags.altTagsCount, altTags.filledAltTagsCount),
        },
      ]
    })

    const formattedCustomCollection = this.formatCollection(customCollections)
    const formattedSmartCollection = this.formatCollection(smartCollections)

    overallAltTagsCount += formattedCustomCollection.overallAltTagsCount
    overallAltTagsCount += formattedSmartCollection.overallAltTagsCount

    overallFilledAltTagsCount += formattedCustomCollection.overallFilledAltTagsCount
    overallFilledAltTagsCount += formattedSmartCollection.overallFilledAltTagsCount

    return super.compute({
      products: formattedProducts,
      pages: formattedPages,
      articles: formattedArticles,
      customCollections: formattedCustomCollection,
      smartCollections: formattedSmartCollection,
      overallAltTagsCount,
      overallFilledAltTagsCount,
      overallFilledAltTagsPercent: this.calculatePercent(overallFilledAltTagsCount, overallAltTagsCount),
    })
  }

  private countAltTags(image: any, ...htmlSources): { altTagsCount: number; filledAltTagsCount: number } {
    let localAltTagsCount = 0
    let localFilledAltTagsCount = 0

    htmlSources.forEach(htmlSource => {
      if (htmlSource === null) return

      const $ = cheerio.load(htmlSource)
      $('img').each((_, element) => {
        localAltTagsCount++

        if (this.isAltTagPresent(element.attribs.alt)) {
          localFilledAltTagsCount++
        }
      })
    })

    if (!isEmpty(image)) {
      localAltTagsCount++

      if (this.isAltTagPresent(image.alt)) {
        localFilledAltTagsCount++
      }
    }

    return { altTagsCount: localAltTagsCount, filledAltTagsCount: localFilledAltTagsCount }
  }

  private formatCollection(collections) {
    let formattedCollection = []
    let overallAltTagsCount = 0
    let overallFilledAltTagsCount = 0

    collections.forEach(collection => {
      const altTags = this.countAltTags(collection.image, collection.body_html)

      overallAltTagsCount += altTags.altTagsCount
      overallFilledAltTagsCount += altTags.filledAltTagsCount

      formattedCollection = [
        ...formattedCollection,
        {
          id: collection.id,
          title: collection.title,
          body_html: collection.body_html,
          image: this.pickImage(collection.image),
          ...this.altTagsArray(altTags.altTagsCount, altTags.filledAltTagsCount),
        },
      ]
    })

    return { overallAltTagsCount, overallFilledAltTagsCount, collection: formattedCollection }
  }

  private isAltTagPresent(altTagValue: string): boolean {
    return altTagValue !== null && altTagValue !== ''
  }

  private altTagsArray(altTagsCount: number, filledAltTagsCount: number) {
    return {
      altTagsCount,
      filledAltTagsCount,
      filledAltTagsPercent: this.calculatePercent(filledAltTagsCount, altTagsCount),
    }
  }

  private calculatePercent(filledAltTagsCount: number, altTagsCount: number): number {
    return floor((filledAltTagsCount * 100) / altTagsCount, 2)
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
