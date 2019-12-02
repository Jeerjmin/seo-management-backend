import { Validator } from 'infrastructure/validator/Validator'

export class AuthParamsValidator implements Validator {
  isValid(...args): boolean {
    const [param] = args

    if (param === null || param === undefined || param.length < 1) {
      return false
    }

    return true
  }
}
