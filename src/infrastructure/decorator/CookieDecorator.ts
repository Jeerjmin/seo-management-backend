import { createParamDecorator } from '@nestjs/common'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'
import { ObfuscationHelper } from 'infrastructure/helper/ObfuscationHelper'
import { Cookies } from 'infrastructure/constants/Cookies'

export const Cookie = createParamDecorator((data: string, req) => {
  return data === Cookies.USER_ID
    ? CookieHelper.userIdCookie(req)
    : ObfuscationHelper.decrypt(CookieHelper.obtainCookie(req, data))
})
