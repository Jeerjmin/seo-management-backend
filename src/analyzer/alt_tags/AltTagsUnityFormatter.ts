import { AltTagsDefaultFormatter } from './AltTagsDefaultFormatter'
import { AnalyzerFormatter } from 'analyzer/AnalyzerFormatter'
import { ArrayHelper } from 'infrastructure/helper/ArrayHelper'

export class AltTagsUnityFormatter extends AltTagsDefaultFormatter implements AnalyzerFormatter {
  format(data: any): any {
    const formattedData = super.format(data)

    const products = ArrayHelper.combineArrays(
      this.filterEmptyAltTags(formattedData.products).map(product => product.images),
    ).map(image => ({
      ...image,
      type: 'PRODUCT',
    }))
    const pages = this.filterEmptyAltTags(formattedData.pages).map(page => ({ ...page, type: 'PAGE' }))
    const articles = this.filterEmptyAltTags(formattedData.articles).map(article => ({ ...article, type: 'ARTICLE' }))
    const customCollections = this.filterEmptyAltTags(formattedData.customCollections).map(collection => ({
      ...collection,
      type: 'CUSTOM_COLLECTIONS',
    }))
    const smartCollections = this.filterEmptyAltTags(formattedData.smartCollections).map(collection => ({
      ...collection,
      type: 'SMART_COLLECTIONS',
    }))

    return [...products, ...pages, ...articles, ...customCollections, ...smartCollections]
  }

  private filterEmptyAltTags(data: any) {
    return data.filter(element => element.altTagsCount > element.filledAltTagsCount)
  }
}
