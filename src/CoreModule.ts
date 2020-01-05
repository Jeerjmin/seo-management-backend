import { APP_INTERCEPTOR } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module, ClassSerializerInterceptor, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { MailerModule } from '@nest-modules/mailer'
import { UI } from 'bull-board'
import * as ormconfig from './ormconfig'
import * as mailerConfig from './mailerConfig'
import { ConfigModule } from 'config/ConfigModule'
import { AuthModule } from 'auth/AuthModule'
import { UserModule } from 'user/UserModule'
import { AnalyzerModule } from 'analyzer/AnalyzerModule'
import { StatsModule } from 'stats/StatsModule'
import { ReportModule } from 'report/ReportModule'
import { IssueModule } from 'issue/IssueModule'
import { BrokenLinkModule } from 'broken_link/BrokenLinkModule'
import { FixerModule } from 'fixer/FixerModule'
import { ContactModule } from 'contact/ContactModule'

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
    ContactModule,
    TypeOrmModule.forRoot(ormconfig),
    MailerModule.forRoot(mailerConfig),
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
