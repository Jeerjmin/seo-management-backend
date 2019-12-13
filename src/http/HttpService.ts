import { Injectable, Inject } from '@nestjs/common'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'
import { REQUEST } from '@nestjs/core'
import { FastifyRequest } from 'fastify'
import { ObfuscationHelper } from 'infrastructure/helper/ObfuscationHelper'
import { ShopifyConstants } from 'infrastructure/constants/ShopifyConstants'
import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

@Injectable()
export class HttpService {
  private readonly axiosInstance: AxiosInstance

  constructor(@Inject(REQUEST) private readonly fastifyRequest: FastifyRequest) {
    this.axiosInstance = Axios.create({
      baseURL: `https://${this.decryptCookie('pfx') + ShopifyConstants.SHOPIFY_API_URL}`,
      headers: { 'X-Shopify-Access-Token': this.decryptCookie('ss') },
    })
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
    return this.axiosInstance.post(url, data, config)
  }

  patch(url: string, data: any, config?: AxiosRequestConfig) {
    return this.axiosInstance.post(url, data, config)
  }

  getRequest() {
    return this.fastifyRequest
  }

  private decryptCookie(cookieName: string) {
    const rawCookie: string = CookieHelper.obtainCookie(this.fastifyRequest, cookieName)
    return ObfuscationHelper.decrypt(rawCookie)
  }
}
