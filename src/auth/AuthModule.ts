import { Module } from '@nestjs/common'
import { AuthController } from './AuthController'
import { AuthService } from './AuthService'
import { AuthValidatorFactory } from './AuthValidatorFactory'
import { UserModule } from 'user/UserModule'

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, AuthValidatorFactory],
})
export class AuthModule {}
