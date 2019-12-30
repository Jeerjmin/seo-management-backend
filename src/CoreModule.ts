import { APP_INTERCEPTOR } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module, ClassSerializerInterceptor, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { UI } from 'bull-board'
import * as ormconfig from './ormconfig'
import { ConfigModule } from 'config/ConfigModule'
import { AuthModule } from 'auth/AuthModule'
import { UserModule } from 'user/UserModule'
import { AnalyzerModule } from 'analyzer/AnalyzerModule'
import { StatsModule } from 'stats/StatsModule'
import { ReportModule } from 'report/ReportModule'
import { IssueModule } from 'issue/IssueModule'
import { BrokenLinkModule } from 'broken_link/BrokenLinkModule'
import { FixerModule } from 'fixer/FixerModule'

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  imports: [
    ConfigModule,
    AuthModule,
    UserModule,
    AnalyzerModule,
    StatsModule,
    ReportModule,
    IssueModule,
    BrokenLinkModule,
    FixerModule,
    TypeOrmModule.forRoot(ormconfig),
  ],
})
export class CoreModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UI).forRoutes({
      path: '*',
      method: RequestMethod.GET,
    })
  }
}
