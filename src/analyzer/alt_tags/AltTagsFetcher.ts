import { AnalyzerFetcher } from 'analyzer/AnalyzerFetcher'
import { HttpService } from 'http/HttpService'
import { HttpException, HttpStatus } from '@nestjs/common'
import { ErrorDto } from 'error/ErrorDto'

export class AltTagsFetcher implements AnalyzerFetcher {
  constructor(private readonly httpService: HttpService) {}

  async getFetchedData(): Promise<object> {
    const products = await this.httpService.get('/products.json')
    const pages = await this.httpService.get('/pages.json')
    const articles = await this.httpService.get('/articles.json')
    const customCollections = await this.httpService.get('/custom_collections.json')
    const smartCollections = await this.httpService.get('/smart_collections.json')

    try {
      return {
        products: products.data.products,
        pages: pages.data.pages,
        articles: articles.data.articles,
        customCollections: customCollections.data.custom_collections,
        smartCollections: smartCollections.data.smart_collections,
      }
    } catch (error) {
      throw new HttpException(
        new ErrorDto(
          HttpStatus.UNPROCESSABLE_ENTITY,
          'There is a problem with Shopify API. Try again in a few minutes.',
          error,
        ),
        HttpStatus.UNPROCESSABLE_ENTITY,
      )
    }
  }
}
