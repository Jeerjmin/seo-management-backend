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

  fetchMe(request, response): Promise<UserDto> {
    return this.service.fetchMe(request, response)
  }

  handleFetch(request, response) {
    this.service.handleFetch(request, response)
  }

  completeOnboarding(request) {
    this.service.completeOnboarding(request)
  }

  saveAppsList(request, appsList: string[]) {
    this.service.saveAppsList(request, appsList)
  }
}
