import { ShopifyConstants } from 'infrastructure/constants/ShopifyConstants'
import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export class HttpService {
  private readonly axiosInstance: AxiosInstance

  private constructor(shopPrefix: string, session: string) {
    this.axiosInstance = Axios.create({
      baseURL: `https://${shopPrefix + ShopifyConstants.SHOPIFY_API_URL}`,
      headers: { 'X-Shopify-Access-Token': session },
    })
  }

  static create(shopPrefix: string, session: string) {
    return new HttpService(shopPrefix, session)
  }

  request(config: AxiosRequestConfig) {
    return this.axiosInstance.request(config)
  }

  get(url: string, config?: AxiosRequestConfig) {
    return this.axiosInstance.get(url, config)
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this.axiosInstance.delete(url, config)
  }

  head(url: string, config?: AxiosRequestConfig) {
    return this.axiosInstance.head(url, config)
  }

  post(url: string, data: any, config?: AxiosRequestConfig) {
    return this.axiosInstance.post(url, data, config)
  }

  put(url: string, data: any, config?: AxiosRequestConfig) {
    return this.axiosInstance.put(url, data, config)
  }

  patch(url: string, data: any, config?: AxiosRequestConfig) {
    return this.axiosInstance.patch(url, data, config)
  }
}
