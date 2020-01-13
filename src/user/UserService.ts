import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { UserEntity } from './UserEntity'
import { UserCreateDto } from './dto/UserCreateDto'
import { UserDto } from './dto/UserDto'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async fetchOrCreate(originalDomain: string, dto: UserCreateDto): Promise<UserDto> {
    let entity: UserDto | UserEntity = await this.findOne(originalDomain)

    if (!entity) {
      entity = await this.save({ ...dto })
    }

    return entity
  }

  async fetchMe(originalDomain: string, accessToken: string): Promise<UserDto> {
    const entity = await this.userRepository.findOne({ where: { originalDomain, accessToken } })
    if (!entity || !originalDomain || !accessToken) {
      return undefined
    }

    return entity
  }

  async handleFetch(originalDomain: string, accessToken: string) {
    const entity: UserDto = await this.fetchMe(originalDomain, accessToken)
    if (!entity) {
      throw new UnauthorizedException()
    }

    return { ...entity, accessToken: undefined, appsList: undefined }
  }

  async completeOnboarding(userId: number) {
    return this.updateEntity(userId, 'onboardingCompleted', true)
  }

  async saveAppsList(userId: number, appsList: string[]) {
    return this.updateEntity(userId, 'appsList', appsList)
  }

  private async save(dto: UserCreateDto | UserDto): Promise<UserEntity> {
    return this.userRepository.save({ ...dto })
  }

  private async findOne(originalDomain: string): Promise<UserDto> {
    return this.userRepository.findOne({ where: { originalDomain } })
  }

  private async findOneById(userId: number) {
    return this.userRepository.findOne({ where: { id: userId } })
  }

  private async updateEntity(userId: number, field: string, value: any): Promise<UserEntity> {
    const entity: UserDto = await this.findOneById(userId)
    entity[field] = value

    return this.save(entity)
  }
}
