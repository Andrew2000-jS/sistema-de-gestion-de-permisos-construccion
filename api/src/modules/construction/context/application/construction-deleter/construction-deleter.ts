import { inject, injectable } from 'inversify'
import { TYPES as ConstructionTypes } from '@src/construction/context/utils'
import { ConstructioRepository } from '../../domain'
import { Criteria } from '@src/shared/modules/context/domain/criteria'
import {
  SharedRepository,
  TYPES as SharedTypes,
  type ApplicationResponse
} from '@src/shared/modules'

@injectable()
export class ConstructionDeleter {
  constructor (
    @inject(ConstructionTypes.ConstructioRepository)
    private readonly repository: ConstructioRepository,
    @inject(SharedTypes.SharedRepository)
    private readonly shrdRepository: SharedRepository
  ) {}

  async run (params: { id: number }): Promise<ApplicationResponse<null>> {
    try {
      const criteria = new Criteria({ id: params.id })
      const isConstructionExist = await this.shrdRepository.match(criteria, 'construction')

      if (isConstructionExist.length === 0) {
        return {
          message: 'No existe esta construccion',
          statusCode: 404,
          data: null
        }
      }
      await this.repository.delete(params.id)
      return { message: 'Construccion eliminada', statusCode: 204, data: null }
    } catch (error) {
      console.log(error)
      return {
        message: 'Algo ha salido mal, intente mas tarde' as string,
        statusCode: 500,
        data: null
      }
    }
  }
}
