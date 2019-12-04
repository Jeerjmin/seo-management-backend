import { AnalyzerType } from './AnalyzerType'
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { HttpService } from 'http/HttpService'
import { pick } from 'lodash'
import { ArrayHelper } from 'infrastructure/helper/ArrayHelper'
import { ErrorDto } from 'error/ErrorDto'

@Injectable()
export class AnalyzerParseDataFactory {
  constructor(private readonly httpService: HttpService) {}

  // TODO improve it, cuz that doesn't make sense yet

  private readonly dataToParse = {
    [AnalyzerType.ALT_TAGS]: this.altTagsData(),
  }

  getDataToParse(analyzerType: AnalyzerType) {
    return this.dataToParse[analyzerType]
  }

  private async altTagsData(): Promise<object> {
    const products = await this.httpService.get('/products.json')
    const pages = await this.httpService.get('/pages.json')
    const articles = await this.httpService.get('/articles.json')
    const customCollections = await this.httpService.get('/custom_collections.json')
    const smartCollections = await this.httpService.get('/smart_collections.json')

    try {
      const productsArray = ArrayHelper.combineArrays(products.data.products.map(product => product.images))
      const pagesArray = pages.data.pages
      const articlesArray = articles.data.articles
      const customCollectionsArray = customCollections.data.custom_collections
      const smartCollectionArray = smartCollections.data.smart_collections

      return {
        products: productsArray.map(image => pick(image, 'id', 'product_id', 'alt', 'src')),
        pages: pagesArray.map(page => pick(page, 'id', 'title', 'body_html')),
        articles: articlesArray.map(article => ({
          id: article.id,
          body_html: article.body_html,
          summary_html: article.summary_html,
          image: this.pickImage(article.image),
        })),
        customCollections: this.mapCollection(customCollectionsArray),
        smartCollections: this.mapCollection(smartCollectionArray),
      }
    } catch (error) {
      throw new HttpException(
        new ErrorDto(422, 'There is a problem with Shopify API. Try again in a few minutes.', error),
        HttpStatus.UNPROCESSABLE_ENTITY,
      )
    }
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
