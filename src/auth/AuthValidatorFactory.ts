import { Injectable } from '@nestjs/common'
import { ConfigService } from 'config/ConfigService'
import { AuthParamsValidator } from './AuthParamsValidator'
import { AuthResponseLinkValidator } from './AuthResponseLinkValidator'
import { AbstractValidatorFactory } from 'infrastructure/validator/AbstractValidatorFactory'

@Injectable()
export class AuthValidatorFactory extends AbstractValidatorFactory {
  constructor(private readonly configService: ConfigService) {
    super()
  }

  validators = {
    AuthParamsValidator: new AuthParamsValidator(),
    AuthResponseLinkValidator: new AuthResponseLinkValidator(this.configService),
  }
}
