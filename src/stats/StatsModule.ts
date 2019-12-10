import { Module } from '@nestjs/common'
import { StatsFacade } from './StatsFacade'
import { StatsController } from './StatsController'
import { UserModule } from 'user/UserModule'
import { ReportsModule } from 'report/ReportModule'

@Module({ imports: [UserModule, ReportsModule], providers: [StatsFacade], controllers: [StatsController] })
export class StatsModule {}
