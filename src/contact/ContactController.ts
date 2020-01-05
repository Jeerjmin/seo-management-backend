import { Controller, Post, Body, Res, Req } from '@nestjs/common'
import { ApiLayers } from 'infrastructure/constants/ApiLayers'
import { ContactDto } from './dto/ContactDto'
import { ContactFacade } from './ContactFacade'
import { FastifyReply } from 'fastify'

@Controller()
export class ContactController {
  constructor(private readonly contactFacade: ContactFacade) {}

  @Post(ApiLayers.CONTACT)
  contactEndpoint(@Body() dto: ContactDto, @Req() request, @Res() response: FastifyReply<any>) {
    this.contactFacade.sendMail(dto, response)
  }
}
