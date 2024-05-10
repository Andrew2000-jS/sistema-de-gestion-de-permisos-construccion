import { inject, injectable } from 'inversify'
import { Criteria } from '@src/shared/modules/context/domain/criteria'
import {
  SharedRepository,
  TYPES as SharedTypes,
  type ApplicationResponse
} from '@src/shared/modules'
import { type OwnerPrimitives } from '../../domain'

@injectable()
export class OwnernGetter {
  constructor (
    @inject(SharedTypes.SharedRepository)
    private readonly shrdRepository: SharedRepository
  ) {}

  async run (): Promise<ApplicationResponse<OwnerPrimitives[]>> {
    try {
      const criteria = new Criteria({})
      const owner = await this.shrdRepository.match(
        criteria,
        'owner'
      )
      return { message: 'Owners', statusCode: 200, data: owner }
    } catch (error) {
      console.log(error)
      return {
        message: 'Algo ha salido mal, intente mas tarde' as string,
        statusCode: 500,
        data: []
      }
    }
  }
}
