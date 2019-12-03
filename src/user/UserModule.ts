import { Module } from '@nestjs/common'
import { UserFacade } from './UserFacade'
import { UserService } from './UserService'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './UserEntity'
import { UserController } from './UserController'

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserFacade],
  exports: [UserFacade],
})
export class UserModule {}
