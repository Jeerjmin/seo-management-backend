import { AltTagsDefaultFormatter } from './AltTagsDefaultFormatter'
import { AnalyzerFormatter } from 'analyzer/AnalyzerFormatter'
import { ArrayHelper } from 'infrastructure/helper/ArrayHelper'

export class AltTagsOverrideFormatter extends AltTagsDefaultFormatter implements AnalyzerFormatter {
  format(data: any): any {
    const formattedData = super.format(data)

    const products = ArrayHelper.combineArrays(formattedData.products.map(product => product.images)).map(image => ({
      ...image,
      type: 'PRODUCT',
    }))
    const pages = formattedData.pages.map(page => ({ ...page, type: 'PAGE' }))
    const articles = formattedData.articles.map(article => ({ ...article, type: 'ARTICLE' }))
    const customCollections = formattedData.customCollections.map(collection => ({
      ...collection,

      type: 'CUSTOM_COLLECTIONS',
    }))
    const smartCollections = formattedData.smartCollections.map(collection => ({
      ...collection,
      type: 'SMART_COLLECTIONS',
    }))

    return [...products, ...pages, ...articles, ...customCollections, ...smartCollections]
  }
}
