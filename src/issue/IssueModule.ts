import { Module } from '@nestjs/common'
import { UserModule } from 'user/UserModule'
import { IssueController } from './IssueController'
import { IssueFacade } from './IssueFacade'
import { IssueService } from './IssueService'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IssueEntity } from './IssueEntity'
import { ModuleInitEventListener } from './ModuleInitEventListener'

@Module({
  controllers: [IssueController],
  imports: [UserModule, TypeOrmModule.forFeature([IssueEntity])],
  providers: [IssueFacade, IssueService, ModuleInitEventListener],
  exports: [IssueFacade],
})
export class IssueModule {}
