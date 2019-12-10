import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { CoreModule } from './CoreModule'
import { HttpExceptionFilter } from 'infrastructure/filter/HttpExceptionFilter'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(CoreModule, new FastifyAdapter())

  app.register(require('fastify-cookie'))
  app.useGlobalFilters(new HttpExceptionFilter())

  app.enableCors({
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'OPTIONS', 'DELETE'],
    origin: process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'http://seoinsights.co',
  })

  await app.listen(3000)
}
bootstrap()
