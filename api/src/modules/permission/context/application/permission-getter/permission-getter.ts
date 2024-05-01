import { inject, injectable } from 'inversify'
import { Criteria } from '@src/shared/modules/context/domain/criteria'
import {
  SharedRepository,
  TYPES as SharedTypes,
  type ApplicationResponse
} from '@src/shared/modules'
import { type PermissionPrimitives } from '../../domain'

@injectable()
export class PermissionGetter {
  constructor (
    @inject(SharedTypes.SharedRepository)
    private readonly shrdRepository: SharedRepository
  ) {}

  async run (): Promise<ApplicationResponse<PermissionPrimitives[]>> {
    try {
      const criteria = new Criteria({})
      const permission = await this.shrdRepository.match(
        criteria,
        'permission'
      )
      return { message: 'Permisos', statusCode: 200, data: permission }
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
