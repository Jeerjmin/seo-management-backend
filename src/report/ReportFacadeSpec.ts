import { TestingModule, Test } from '@nestjs/testing'
import { ReportFacade } from './ReportFacade'
import { ReportEntity } from './ReportEntity'
import { repositoryMockFactory } from '../../jest/jest-helpers'
import { getRepositoryToken } from '@nestjs/typeorm'
import { ReportService } from './ReportService'
import { RepositoryHelper } from 'infrastructure/helper/RepositoryHelper'
import * as reportsStub from 'stubs/reports-stub.json'
import { ReportParamsValidator } from './ReportParamsValidator'

describe('ReportFacade', () => {
  let reportFacade: ReportFacade
  const reports: Array<any> = reportsStub

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportFacade,
        ReportService,
        ReportParamsValidator,
        { provide: getRepositoryToken(ReportEntity), useFactory: repositoryMockFactory },
      ],
    }).compile()

    reportFacade = module.get<ReportFacade>(ReportFacade)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('fetchReport', () => {
    it('should fetch the report', async () => {
      jest.spyOn<any, any>(RepositoryHelper, 'findOneOrThrow').mockImplementation(() => reports[0])
      expect(await reportFacade.fetchReport(reports[0].id)).toStrictEqual(reports[0])
    })
  })
})
