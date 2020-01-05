import { Module } from '@nestjs/common'
import { ContactController } from './ContactController'
import { ContactService } from './ContactService'
import { ContactFacade } from './ContactFacade'
import { ModuleInitEventListener } from './ModuleInitEventListener'

@Module({
  controllers: [ContactController],
  providers: [ContactService, ContactFacade, ModuleInitEventListener],
  exports: [ContactFacade],
})
export class ContactModule {}
