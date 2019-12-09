import { Module } from '@nestjs/common'
import { AnalyzerRegistry } from './AnalyzerRegistry'
import { AnalyzerModuleInitListener } from './AnalyzerModuleInitListener'
import { AnalyzerController } from './AnalyzerController'
import { UserModule } from 'user/UserModule'
import { AnalyzerFacade } from './AnalyzerFacade'
import { AnalyzerService } from './AnalyzerService'
import { HttpModule } from 'http/HttpModule'
import { AnalyzerDataFetcher } from './AnalyzerDataFetcher'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AnalyzerEntity } from './AnalyzerEntity'

@Module({
  controllers: [AnalyzerController],
  providers: [
    AnalyzerRegistry,
    AnalyzerFacade,
    AnalyzerService,
    AnalyzerModuleInitListener,
    AnalyzerRegistry,
    AnalyzerDataFetcher,
  ],
  imports: [UserModule, HttpModule, TypeOrmModule.forFeature([AnalyzerEntity])],
  exports: [AnalyzerFacade],
})
export class AnalyzerModule {}
