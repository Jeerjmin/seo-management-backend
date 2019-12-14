import { Validator } from 'infrastructure/validator/Validator'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ReportParamsValidator implements Validator {
  isValid(...args: any[]): boolean {
    const [id] = args
    const isNumber = id !== '' && !isNaN(+id)

    return isNumber
  }
}
