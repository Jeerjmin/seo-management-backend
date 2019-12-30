import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { FixerType } from './FixerType'
import { FixerRegistry } from './FixerRegistry'
import { Fixer } from './Fixer'
import { ErrorDto } from 'error/ErrorDto'

@Injectable()
export class FixerService {
  constructor(private readonly fixerRegistry: FixerRegistry) {}

  async fix(type: string, args: any): Promise<void> {
    const fixerType: FixerType = FixerType[type] as FixerType
    const isTypeValid = fixerType !== undefined && isNaN(+fixerType)

    if (isTypeValid) {
      const fixer: Fixer = this.fixerRegistry.getFixer(fixerType)
      await fixer.fix(args)

      return
    }

    throw new HttpException(new ErrorDto(400, `Unknown fixer type: ${fixerType}`), HttpStatus.BAD_REQUEST)
  }
}
