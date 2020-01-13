import { TestingModule, Test } from '@nestjs/testing'
import * as usersStub from 'stubs/users-stub.json'
import * as usersDtoStub from 'stubs/users-dto-stub.json'
import { UserFacade } from './UserFacade'
import { UserService } from './UserService'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UserEntity } from './UserEntity'
import { Repository } from 'typeorm'
import { UnauthorizedException } from '@nestjs/common'
import { UserCreateDto } from './dto/UserCreateDto'
import { UserDto } from './dto/UserDto'

describe('UserFacade', () => {
  let userFacade: UserFacade
  let userService: UserService
  const users: Array<UserEntity> = usersStub
  const usersDto: Array<UserDto> = usersDtoStub

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFacade, UserService, { provide: getRepositoryToken(UserEntity), useClass: Repository }],
    }).compile()

    userFacade = module.get<UserFacade>(UserFacade)
    userService = module.get<UserService>(UserService)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('fetchOrCreate', () => {
    it('should fetch the user', async () => {
      jest.spyOn<any, any>(userService, 'findOne').mockImplementation(() => usersDto[0])
      const userDto: UserCreateDto = users[0] as UserCreateDto

      expect(await userFacade.fetchOrCreate(userDto.originalDomain, userDto)).toStrictEqual(usersDto[0])
    })

    it('should create an user', async () => {
      jest.spyOn<any, any>(userService, 'findOne').mockImplementation(() => undefined)
      jest.spyOn<any, any>(userService, 'save').mockImplementation(() => users[0])

      const userDto: UserCreateDto = users[0] as UserCreateDto
      expect(await userFacade.fetchOrCreate(userDto.originalDomain, userDto)).toStrictEqual(users[0])
    })
  })

  describe('fetchMe', () => {
    it('should return user entity ', async () => {
      jest.spyOn(userService, 'fetchMe').mockImplementation(() => Promise.resolve(users[0]))
      expect(await userFacade.fetchMe(users[0].originalDomain, users[0].accessToken)).toStrictEqual(users[0])
    })

    it('should return undefined if entity was not found', async () => {
      expect(await userFacade.fetchMe(users[0].originalDomain, users[0].accessToken)).toBe(undefined)
    })

    it('should return undefined if one of parameters is null/undefined', async () => {
      expect(await userFacade.fetchMe(null, null)).toBe(undefined)
      expect(await userFacade.fetchMe(undefined, undefined)).toBe(undefined)
    })
  })

  describe('handleFetch', () => {
    it('should throw UnauthorizedException if user was not found', () => {
      jest.spyOn(userService, 'fetchMe').mockImplementation(() => Promise.resolve(undefined))
      expect(userFacade.handleFetch(users[0].originalDomain, users[0].accessToken)).rejects.toThrowError(
        UnauthorizedException,
      )
    })

    it('should return entity without accessToken if present', async () => {
      jest.spyOn(userService, 'fetchMe').mockImplementation(() => Promise.resolve(users[0]))
      expect(await userFacade.handleFetch(users[0].originalDomain, users[0].accessToken)).toStrictEqual({
        ...users[0],
        accessToken: undefined,
        appsList: undefined,
      })
    })
  })

  describe('completeOnboarding', () => {
    it('should change onboardingComplete property to true', async () => {
      jest.spyOn<any, any>(userService, 'save').mockImplementation((dto: UserEntity | UserDto) => dto)
      jest.spyOn<any, any>(userService, 'findOneById').mockImplementation(() => users[0])

      expect(await userFacade.completeOnboarding(users[0].id)).toHaveProperty('onboardingCompleted', true)
    })
  })

  describe('saveAppsList', () => {
    it('should change appsList property to specified list', async () => {
      jest.spyOn<any, any>(userService, 'save').mockImplementation((dto: UserEntity | UserDto) => dto)
      jest.spyOn<any, any>(userService, 'findOneById').mockImplementation(() => users[0])

      expect(await userFacade.saveAppsList(users[0].id, ['Test item', 'Second item'])).toHaveProperty('appsList', [
        'Test item',
        'Second item',
      ])
    })
  })
})
