import { Buildable } from 'infrastructure/helper/Buildable'

export class ShopifyAuthLinkBuilder implements Buildable<string> {
  private shopName: string
  private apiKey: string
  private scopes: string
  private redirectUri: string
  private nonce: string

  withShopName(shopName: string): ShopifyAuthLinkBuilder {
    this.shopName = shopName
    return this
  }

  withApiKey(apiKey: string): ShopifyAuthLinkBuilder {
    this.apiKey = apiKey
    return this
  }

  withScopes(scopes: string): ShopifyAuthLinkBuilder {
    this.scopes = scopes
    return this
  }

  withRedirectUri(redirectUri: string): ShopifyAuthLinkBuilder {
    this.redirectUri = redirectUri
    return this
  }

  withNonce(nonce: string): ShopifyAuthLinkBuilder {
    this.nonce = nonce
    return this
  }

  build(): string {
    return `https://${this.shopName}/admin/oauth/authorize?client_id=${this.apiKey}&scope=${
      this.scopes
    }&redirect_uri=${this.redirectUri}&state=${this.nonce}`
  }
}
