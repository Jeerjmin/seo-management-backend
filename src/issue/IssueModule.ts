import { Module } from '@nestjs/common'
import { UserModule } from 'user/UserModule'
import { IssueController } from './IssueController'
import { IssueFacade } from './IssueFacade'
import { IssueService } from './IssueService'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IssueEntity } from './IssueEntity'
import { ModuleInitEventListener } from './ModuleInitEventListener'
import { FixerModule } from 'fixer/FixerModule'

@Module({
  controllers: [IssueController],
  imports: [UserModule, FixerModule, TypeOrmModule.forFeature([IssueEntity])],
  providers: [IssueFacade, IssueService, ModuleInitEventListener],
  exports: [IssueFacade],
})
export class IssueModule {}
