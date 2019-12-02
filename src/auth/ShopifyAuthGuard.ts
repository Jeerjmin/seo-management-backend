import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'

@Injectable()
export class ShopifyAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpContext = context.switchToHttp()
    const request = httpContext.getRequest()
    const response = httpContext.getResponse()

    // TODO check if user exists in database by access token and shopName
    // also check if id cookie is valid here (if not create valid one)

    return false
  }
}
