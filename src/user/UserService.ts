import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { CookieHelper } from 'infrastructure/helper/CookieHelper'
import { ObfuscationHelper } from 'infrastructure/helper/ObfuscationHelper'
import { ErrorDto } from 'error/ErrorDto'
import { UserEntity } from './UserEntity'
import { UserCreateDto } from './dto/UserCreateDto'
import { UserDto } from './dto/UserDto'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async fetchOrCreate(originalDomain: string, dto: UserCreateDto): Promise<UserDto> {
    let entity = await this.userRepository.findOne({ where: { originalDomain } })

    if (!entity) {
      entity = await this.userRepository.save({ ...dto })
    }

    return entity
  }

  async fetchMe(request, response): Promise<UserDto> {
    const prefixCookie = this.getAndDecryptCookie(request, 'pfx')
    const sessionCookie = this.getAndDecryptCookie(request, 'ss')

    const entity = await this.userRepository.findOne({
      where: { originalDomain: prefixCookie, accessToken: sessionCookie },
    })

    if (!entity || !prefixCookie || !sessionCookie) {
      return undefined
    }

    CookieHelper.createCookie(response, 'id', entity.id.toString())

    return entity
  }

  async handleFetch(request, response) {
    const entity: UserDto = await this.fetchMe(request, response)

    if (!entity) {
      response.status(401).send(new ErrorDto(401, 'Unauthorized'))
    }

    response.status(200).send({ ...entity, accessToken: undefined })
  }

  private getAndDecryptCookie(request, cookieName: string) {
    const rawCookie = CookieHelper.obtainCookie(request, cookieName)
    return ObfuscationHelper.decrypt(rawCookie)
  }
}
