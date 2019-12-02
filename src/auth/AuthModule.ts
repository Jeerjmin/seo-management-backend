import { Module } from '@nestjs/common'
import { AuthController } from './AuthController'
import { AuthService } from './AuthService'
import { AuthValidatorFactory } from './AuthValidatorFactory'

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthValidatorFactory],
})
export class AuthModule {}
