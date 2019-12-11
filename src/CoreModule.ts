import { APP_INTERCEPTOR } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module, ClassSerializerInterceptor } from '@nestjs/common'
import * as ormconfig from './ormconfig'
import { ConfigModule } from 'config/ConfigModule'
import { AuthModule } from 'auth/AuthModule'
import { UserModule } from 'user/UserModule'
import { AnalyzerModule } from 'analyzer/AnalyzerModule'
import { HttpModule } from 'http/HttpModule'
import { StatsModule } from 'stats/StatsModule'
import { ReportModule } from 'report/ReportModule'
import { IssueModule } from 'issue/IssueModule'

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
    HttpModule,
    StatsModule,
    ReportModule,
    IssueModule,
    TypeOrmModule.forRoot(ormconfig),
  ],
})
export class CoreModule {}
