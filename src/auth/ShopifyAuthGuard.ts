import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { UserFacade } from 'user/UserFacade'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'

@Injectable()
export class ShopifyAuthGuard implements CanActivate {
  constructor(private readonly userFacade: UserFacade) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpContext = context.switchToHttp()
    const request = httpContext.getRequest()
    const response = httpContext.getResponse()

    const user = await this.userFacade.fetchMe(request, response)

    if (user) {
      const idCookie = CookieHelper.userIdCookie(request)
      CookieHelper.createCookie(response, 'id', user.id.toString())

      return idCookie === user.id
    }

    return false
  }
}
