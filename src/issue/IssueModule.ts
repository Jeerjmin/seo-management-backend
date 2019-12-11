import { Module } from '@nestjs/common'
import { UserModule } from 'user/UserModule'
import { AnalyzerModule } from 'analyzer/AnalyzerModule'
import { IssueController } from './IssueController'
import { IssueFacade } from './IssueFacade'
import { IssueService } from './IssueService'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IssueEntity } from './IssueEntity'

@Module({
  controllers: [IssueController],
  imports: [UserModule, AnalyzerModule, TypeOrmModule.forFeature([IssueEntity])],
  providers: [IssueFacade, IssueService],
  exports: [IssueFacade],
})
export class IssueModule {}
