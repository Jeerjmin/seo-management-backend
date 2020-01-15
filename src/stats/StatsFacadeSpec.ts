import { TestingModule, Test } from '@nestjs/testing'
import { StatsFacade } from './StatsFacade'
import { StatsService } from './StatsService'
import * as userStub from 'stubs/user-stub.json'
import * as reportsStub from 'stubs/reports-stub.json'
import { UserDto } from 'user/dto/UserDto'
import { StatsDto } from './StatsDto'
import { getRepositoryToken } from '@nestjs/typeorm'
import { ReportEntity } from 'report/ReportEntity'
import { ReportFacade } from 'report/ReportFacade'
import { ReportService } from 'report/ReportService'
import { ReportParamsValidator } from 'report/ReportParamsValidator'
import { repositoryMockFactory } from '../../jest/jest-helpers'

describe('StatsFacade', () => {
  let statsService: StatsService
  let statsFacade: StatsFacade
  const user: UserDto = userStub
  const reports: Array<any> = reportsStub

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatsFacade,
        StatsService,
        ReportFacade,
        ReportService,
        ReportParamsValidator,
        { provide: getRepositoryToken(ReportEntity), useFactory: repositoryMockFactory },
      ],
    }).compile()

    statsService = module.get<StatsService>(StatsService)
    statsFacade = module.get<StatsFacade>(StatsFacade)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('generateOverallStats', () => {
    it('should return N/A if no reports found', async () => {
      jest.spyOn<StatsService, any>(statsService, 'getLastReport').mockImplementation(() => undefined)
      jest.spyOn<StatsService, any>(statsService, 'getPenultReport').mockImplementation(() => undefined)

      expect(await statsFacade.generateOverallStats(user.id)).toStrictEqual(
        new StatsDto(
          { value: 'N/A', lastValue: 'N/A', createdAt: 'Never' },
          { value: 'N/A', lastValue: 'N/A', createdAt: 'Never' },
          { value: 'N/A', lastValue: 'N/A', createdAt: 'Never' },
        ),
      )
    })

    it('shoud return last value without penult', async () => {
      jest.spyOn<StatsService, any>(statsService, 'getLastReport').mockImplementation(() => reports[0])
      jest.spyOn<StatsService, any>(statsService, 'getPenultReport').mockImplementation(() => undefined)

      expect(await statsFacade.generateOverallStats(user.id)).toStrictEqual(
        new StatsDto(
          {
            value: reports[0].details.accessibilityScore,
            lastValue: 'N/A',
            createdAt: new Date(reports[0].createdAt).toLocaleDateString(),
          },
          {
            value: reports[0].details.performanceScore,
            lastValue: 'N/A',
            createdAt: new Date(reports[0].createdAt).toLocaleDateString(),
          },
          {
            value: reports[0].details.bestPracticesScore,
            lastValue: 'N/A',
            createdAt: new Date(reports[0].createdAt).toLocaleDateString(),
          },
        ),
      )
    })

    it('should return last value and penult value', async () => {
      jest.spyOn<StatsService, any>(statsService, 'getLastReport').mockImplementation(() => reports[0])
      jest.spyOn<StatsService, any>(statsService, 'getPenultReport').mockImplementation(() => reports[1])

      expect(await statsFacade.generateOverallStats(user.id)).toStrictEqual(
        new StatsDto(
          {
            value: reports[0].details.accessibilityScore,
            lastValue: reports[1].details.accessibilityScore,
            createdAt: new Date(reports[0].createdAt).toLocaleDateString(),
          },
          {
            value: reports[0].details.performanceScore,
            lastValue: reports[1].details.performanceScore,
            createdAt: new Date(reports[0].createdAt).toLocaleDateString(),
          },
          {
            value: reports[0].details.bestPracticesScore,
            lastValue: reports[1].details.bestPracticesScore,
            createdAt: new Date(reports[0].createdAt).toLocaleDateString(),
          },
        ),
      )
    })

    it('should return N/A if report has null value', async () => {
      jest.spyOn<StatsService, any>(statsService, 'getLastReport').mockImplementation(() => reports[1])
      jest.spyOn<StatsService, any>(statsService, 'getPenultReport').mockImplementation(() => reports[2])

      expect(await statsFacade.generateOverallStats(user.id)).toStrictEqual(
        new StatsDto(
          {
            value: reports[1].details.accessibilityScore,
            lastValue: 'N/A',
            createdAt: new Date(reports[1].createdAt).toLocaleDateString(),
          },
          {
            value: reports[1].details.performanceScore,
            lastValue: reports[2].details.performanceScore,
            createdAt: new Date(reports[1].createdAt).toLocaleDateString(),
          },
          {
            value: reports[1].details.bestPracticesScore,
            lastValue: 'N/A',
            createdAt: new Date(reports[1].createdAt).toLocaleDateString(),
          },
        ),
      )
    })
  })
})
