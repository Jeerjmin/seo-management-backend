import { Injectable } from '@nestjs/common'
import { FixerType } from './FixerType'
import { Fixer } from './Fixer'

@Injectable()
export class FixerRegistry {
  private readonly fixers: Map<FixerType, Fixer> = new Map<FixerType, Fixer>()

  register(...specifiedFixers: Array<{ type: FixerType; instance: Fixer }>): void {
    specifiedFixers.forEach(fixer => {
      this.fixers.set(fixer.type, fixer.instance)
    })
  }

  getFixer(fixerType: FixerType) {
    return this.fixers.get(fixerType)
  }

  getAllFixers() {
    return new Map<FixerType, Fixer>(this.fixers)
  }
}
