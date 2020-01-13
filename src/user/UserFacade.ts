import { Injectable } from '@nestjs/common'
import { UserCreateDto } from './dto/UserCreateDto'
import { UserService } from './UserService'
import { UserDto } from './dto/UserDto'

@Injectable()
export class UserFacade {
  constructor(private readonly service: UserService) {}

  fetchOrCreate(originalDomain: string, dto: UserCreateDto): Promise<UserDto> {
    return this.service.fetchOrCreate(originalDomain, dto)
  }

  fetchMe(originalDomain: string, accessToken: string): Promise<UserDto> {
    return this.service.fetchMe(originalDomain, accessToken)
  }

  handleFetch(originalDomain: string, accessToken: string) {
    return this.service.handleFetch(originalDomain, accessToken)
  }

  completeOnboarding(userId: number) {
    return this.service.completeOnboarding(userId)
  }

  saveAppsList(userId: number, appsList: string[]) {
    return this.service.saveAppsList(userId, appsList)
  }
}
