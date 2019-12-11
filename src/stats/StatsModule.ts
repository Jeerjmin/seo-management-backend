import { Module } from '@nestjs/common'
import { StatsFacade } from './StatsFacade'
import { StatsController } from './StatsController'
import { UserModule } from 'user/UserModule'
import { ReportModule } from 'report/ReportModule'

@Module({ imports: [UserModule, ReportModule], providers: [StatsFacade], controllers: [StatsController] })
export class StatsModule {}
