import { Injectable } from '@nestjs/common'
import { FixerService } from './FixerService'

@Injectable()
export class FixerFacade {
  constructor(private readonly fixerService: FixerService) {}

  fix(type: string, args: any): Promise<void> {
    return this.fixerService.fix(type, args)
  }
}
