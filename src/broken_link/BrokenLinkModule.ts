import { Module } from '@nestjs/common'
import { BrokenLinkFacade } from './BrokenLinkFacade'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BrokenLinkEntity } from './BrokenLinkEntity'
import { UserModule } from 'user/UserModule'
import { AnalyzerModule } from 'analyzer/AnalyzerModule'
import { BrokenLinkController } from './BrokenLinkController'
import { BrokenLinkService } from './BrokenLinkService'
import { BrokenLinkScanTypeValidator } from './BrokenLinkScanTypeValidator'
import { ModuleInitEventListener } from './ModuleInitEventListener'

@Module({
  imports: [TypeOrmModule.forFeature([BrokenLinkEntity]), UserModule, AnalyzerModule],
  providers: [BrokenLinkFacade, BrokenLinkService, BrokenLinkScanTypeValidator, ModuleInitEventListener],
  controllers: [BrokenLinkController],
})
export class BrokenLinkModule {}
