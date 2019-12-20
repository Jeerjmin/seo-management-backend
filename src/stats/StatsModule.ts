import { Module } from '@nestjs/common'
import { StatsFacade } from './StatsFacade'
import { StatsController } from './StatsController'
import { UserModule } from 'user/UserModule'
import { ReportModule } from 'report/ReportModule'
import { StatsService } from './StatsService'

@Module({ imports: [UserModule, ReportModule], providers: [StatsFacade, StatsService], controllers: [StatsController] })
export class StatsModule {}
