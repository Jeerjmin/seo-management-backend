import { Module } from '@nestjs/common'
import { AnalyzerModule } from 'analyzer/AnalyzerModule'
import { FixerRegistry } from './FixerRegistry'
import { ModuleInitEventListener } from './ModuleInitEventListener'
import { FixerFacade } from './FixerFacade'
import { UserModule } from 'user/UserModule'
import { FixerService } from './FixerService'
import { FixerController } from './FixerController'

@Module({
  controllers: [FixerController],
  imports: [AnalyzerModule, UserModule],
  providers: [FixerRegistry, ModuleInitEventListener, FixerFacade, FixerService],
  exports: [FixerFacade],
})
export class FixerModule {}
