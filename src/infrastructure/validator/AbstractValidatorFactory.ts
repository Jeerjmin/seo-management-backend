import { Validator } from './Validator'

export abstract class AbstractValidatorFactory {
  validators = {}

  getValidator(validatorClassName): Validator {
    const validator = this.validators[validatorClassName]

    if (!validator) {
      throw new Error(`Validator with name ${validatorClassName} does not exist`)
    }

    return validator
  }
}
