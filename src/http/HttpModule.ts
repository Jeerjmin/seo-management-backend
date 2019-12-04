import { Global, Module } from '@nestjs/common'
import { HttpService } from './HttpService'

@Global()
@Module({ providers: [HttpService], exports: [HttpService] })
export class HttpModule {}
