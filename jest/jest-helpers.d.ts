import { Repository } from 'typeorm'
import { MockType } from './jest-helpers'

declare function repositoryMockFactory(): MockType<Repository<any>>
