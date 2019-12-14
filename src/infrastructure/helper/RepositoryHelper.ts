import { Repository, FindOneOptions } from 'typeorm'
import { NotFoundException } from '@nestjs/common'

export class RepositoryHelper {
  private constructor() {}

  static async findOneOrThrow<T>(
    repository: Repository<T>,
    options: FindOneOptions,
    throwHandler = () => {
      throw new NotFoundException()
    },
  ): Promise<T> {
    const dbEntity: T = await repository.findOne(options)

    if (!dbEntity) {
      throwHandler()
    }

    return dbEntity
  }
}
