import { AbstractAnalyzer } from './AbstractAnalyzer'
import { ArrayHelper } from 'infrastructure/helper/ArrayHelper'
import { pick } from 'lodash'

export class AltTagsAnalyzer extends AbstractAnalyzer {
  protected async compute(dataPromise: Promise<any>) {
    const data = await dataPromise
    const { products, pages, articles, customCollections, smartCollections } = data

    const productsArray = ArrayHelper.combineArrays(products.map(product => product.images))

    return super.compute({
      products: productsArray.map(image => pick(image, 'id', 'product_id', 'alt', 'src')),
      pages: pages.map(page => pick(page, 'id', 'title', 'body_html')),
      articles: articles.map(article => ({
        id: article.id,
        body_html: article.body_html,
        summary_html: article.summary_html,
        image: this.pickImage(article.image),
      })),
      customCollections: this.mapCollection(customCollections),
      smartCollections: this.mapCollection(smartCollections),
    })
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
