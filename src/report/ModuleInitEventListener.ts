import { Injectable, OnModuleInit } from '@nestjs/common'

@Injectable()
export class ModuleInitEventListener implements OnModuleInit {
  onModuleInit() {
    console.log('module init')
  }
}
