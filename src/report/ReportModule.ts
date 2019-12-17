import { Module } from '@nestjs/common'
import { ReportController } from './ReportController'
import { AnalyzerModule } from 'analyzer/AnalyzerModule'
import { UserModule } from 'user/UserModule'
import { ReportFacade } from './ReportFacade'
import { ReportEntity } from './ReportEntity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReportService } from './ReportService'
import { IssueModule } from 'issue/IssueModule'
import { ReportParamsValidator } from './ReportParamsValidator'
import { ReportGenerateReportProcessor } from './ReportGenerateReportProcessor'

@Module({
  controllers: [ReportController],
  providers: [ReportFacade, ReportService, ReportParamsValidator, ReportGenerateReportProcessor],
  imports: [AnalyzerModule, UserModule, IssueModule, TypeOrmModule.forFeature([ReportEntity])],
  exports: [ReportFacade],
})
export class ReportModule {}
