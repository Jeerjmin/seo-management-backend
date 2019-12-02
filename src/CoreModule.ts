import { APP_INTERCEPTOR } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module, ClassSerializerInterceptor } from '@nestjs/common'
import * as ormconfig from './ormconfig'
import { ConfigModule } from './config/ConfigModule'

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  imports: [ConfigModule, TypeOrmModule.forRoot(ormconfig)],
})
export class CoreModule {}
