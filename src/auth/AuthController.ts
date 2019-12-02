import { Controller, Req, Res, Get, Query, Delete, UseGuards } from '@nestjs/common'
import { AuthService } from './AuthService'
import { ApiLayers } from 'infrastructure/constants/ApiLayers'
import { ShopifyAuthGuard } from './ShopifyAuthGuard'
import { FastifyRequest } from 'fastify'

@Controller(ApiLayers.SESSIONS)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('install') handleOAuth(@Res() response, @Query('shop') shop: string) {
    this.authService.handleOAuth(response, shop)
  }

  @Get('install/callback') handleOauthCallback(@Req() request: FastifyRequest, @Res() response) {
    this.authService.handleOAuthCallback(request, response)
  }

  @UseGuards(ShopifyAuthGuard)
  @Delete()
  handleLogout(@Res() response) {
    this.authService.handleLogout(response)
  }
}
