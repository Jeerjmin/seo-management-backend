import { ExceptionFilter, HttpException, Catch, ArgumentsHost } from '@nestjs/common'
import { ErrorDto } from 'error/ErrorDto'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any | HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse()
    const isTypeError = exception.toString().includes('TypeError')

    const isFastifyError = exception.name.includes('FastifyError')
    const isHttpException = typeof exception.getStatus !== 'function'

    if (isTypeError) {
      console.error(exception)
      response.status(500).send(new ErrorDto(500, 'Internal Server Error'))

      return
    }

    if (isFastifyError) {
      const status = exception.statusCode
      response.status(status).send(new ErrorDto(status, this.formatErrorMessage(exception.message, exception.code)))

      return
    }

    if (isHttpException) {
      console.error(exception)
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

  private formatErrorMessage(message: string, errorPrefix: string): string {
    return message
      .replace(errorPrefix, '')
      .replace(':', '')
      .trim()
  }
}
