import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { CoreModule } from './CoreModule'
import { HttpExceptionFilter } from 'infrastructure/filter/HttpExceptionFilter'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(CoreModule, new FastifyAdapter())

  app.register(require('fastify-cookie'))
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe())

  app.enableCors({
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'OPTIONS', 'DELETE'],
    allowedHeaders: ['Cache-Control', 'Content-Type'],
    exposedHeaders: ['Location'],
    origin: [
      'http://localhost',
      process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://api.seoinsights.io',
    ],
  })

  await app.listen(3000)
}
bootstrap()
