import { Module } from '@nestjs/common'
import { AnalyzerRegistry } from './AnalyzerRegistry'
import { AnalyzerModuleInitListener } from './AnalyzerModuleInitListener'
import { AnalyzerController } from './AnalyzerController'
import { UserModule } from 'user/UserModule'
import { AnalyzerFacade } from './AnalyzerFacade'
import { AnalyzerService } from './AnalyzerService'

@Module({
  controllers: [AnalyzerController],
  providers: [AnalyzerRegistry, AnalyzerFacade, AnalyzerService, AnalyzerModuleInitListener, AnalyzerRegistry],
  imports: [UserModule],
})
export class AnalyzerModule {}
