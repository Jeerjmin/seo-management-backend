import crypto from 'crypto'
import queryString from 'query-string'

export class HmacValidatorHelper {
  static checkHmacValidity(apiSecret: string, query: ShopifyCallbackQuery) {
    if (!apiSecret || !query) {
      return false
    }

    let newQuery: ShopifyCallbackQuery = query

    if (!newQuery.hmac) {
      return false
    }

    const hmac = newQuery.hmac
    const removeHmac: any = (key, { [key]: _, ...rest }) => rest

    newQuery = removeHmac('hmac', newQuery)

    const input = queryString.stringify(newQuery)
    const hash = crypto
      .createHmac('sha256', apiSecret)
      .update(input)
      .digest('hex')

    return hash === hmac
  }
}
