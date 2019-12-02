export class CookieHelper {
  private static readonly COOKIE_PREFIX: string = '_seoinsights_'

  static createCookie(
    response,
    name: string,
    value: string,
    options = { expires: new Date(new Date().getTime() + 1000 * 3600 * 24 * 365) },
  ) {
    response.setCookie(CookieHelper.COOKIE_PREFIX + name, value, {
      httpOnly: true,
      expires: options.expires,
      path: '/',
    })
  }

  static deleteCookie(response, name: string) {
    response.clearCookie(CookieHelper.COOKIE_PREFIX + name, { path: '/' })
  }

  static obtainCookie(request, name: string) {
    return request.cookies[CookieHelper.COOKIE_PREFIX + name]
  }

  static userIdCookie(request) {
    return Number.parseInt(CookieHelper.obtainCookie(request, 'id'), 10)
  }
}
