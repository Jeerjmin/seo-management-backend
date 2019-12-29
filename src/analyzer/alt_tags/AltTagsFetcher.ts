import { AnalyzerFetcher } from 'analyzer/AnalyzerFetcher'
import { HttpException, HttpStatus } from '@nestjs/common'
import { ErrorDto } from 'error/ErrorDto'
import { HttpService } from 'http/HttpService'

export class AltTagsFetcher implements AnalyzerFetcher {
  async getFetchedData(dependencies): Promise<object> {
    const { shopPrefix, session }: { shopPrefix: string; session: string } = dependencies
    const httpService: HttpService = HttpService.create(shopPrefix, session)


    const products = await httpService.get('/products.json')
    const pages = await httpService.get('/pages.json')
    const articles = await httpService.get('/articles.json')
    const customCollections = await httpService.get('/custom_collections.json')
    const smartCollections = await httpService.get('/smart_collections.json')

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
