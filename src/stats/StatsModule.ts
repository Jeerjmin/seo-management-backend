import { Module } from '@nestjs/common'
import { StatsFacade } from './StatsFacade'
import { StatsController } from './StatsController'
import { UserModule } from 'user/UserModule'
import { AnalyzerModule } from 'analyzer/AnalyzerModule'

@Module({ imports: [UserModule, AnalyzerModule], providers: [StatsFacade], controllers: [StatsController] })
export class StatsModule {}
