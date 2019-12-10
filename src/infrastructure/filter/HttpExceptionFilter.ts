import { ExceptionFilter, HttpException, Catch, ArgumentsHost } from '@nestjs/common'
import { ErrorDto } from 'error/ErrorDto'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any | HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse()

    if (exception.toString().includes('TypeError')) {
      console.error(exception)
      response.status(500).send(new ErrorDto(500, 'Internal Server Error'))
      return
    }

    if (exception.name.includes('FastifyError')) {
      const status = exception.statusCode
      const message = this.formatErrorMessage(exception.message, exception.code)

      response.status(status).send(new ErrorDto(status, message))
      return
    }

    const status: number = exception.getStatus()
    let message: string = exception.getResponse()
    let externalMessage: string

    if (typeof message === 'object') {
      const { message: nativeMessage, externalMessage: nativeExternalMessage } = exception.getResponse()

      message = nativeMessage
      externalMessage = nativeExternalMessage
    }

    response.status(status).send(new ErrorDto(status, message, externalMessage))
  }

  private formatErrorMessage(message: string, errorPrefix: string) {
    return message
      .replace(errorPrefix, '')
      .replace(':', '')
      .trim()
  }
}
