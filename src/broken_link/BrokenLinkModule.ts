import { Module } from '@nestjs/common'
import { ScanForBrokenLinksProcessor } from './ScanForBrokenLinksProcessor'
import { BrokenLinkFacade } from './BrokenLinkFacade'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BrokenLinkEntity } from './BrokenLinkEntity'
import { UserModule } from 'user/UserModule'
import { AnalyzerModule } from 'analyzer/AnalyzerModule'
import { BrokenLinkController } from './BrokenLinkController'
import { BrokenLinkService } from './BrokenLinkService'
import { BrokenLinkScanTypeValidator } from './BrokenLinkScanTypeValidator'

@Module({
  imports: [TypeOrmModule.forFeature([BrokenLinkEntity]), UserModule, AnalyzerModule],
  providers: [ScanForBrokenLinksProcessor, BrokenLinkFacade, BrokenLinkService, BrokenLinkScanTypeValidator],
  controllers: [BrokenLinkController],
})
export class BrokenLinkModule {}
