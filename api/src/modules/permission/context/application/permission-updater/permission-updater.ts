import { inject, injectable } from 'inversify'
import { TYPES as PermissionTypes } from '../../utils'
import { type PermissionPrimitives, PermissionRepository } from '../../domain'
import {
  SharedRepository,
  TYPES as SharedTypes,
  type ApplicationResponse
} from '@src/shared/modules'
import { Criteria } from '@src/shared/modules/context/domain/criteria'

@injectable()
export class PermissionUpdater {
  constructor (
    @inject(PermissionTypes.PermissionRepository)
    private readonly repository: PermissionRepository,
    @inject(SharedTypes.SharedRepository)
    private readonly shrdRepository: SharedRepository
  ) {}

  async run (params: {
    id: number
    data: PermissionPrimitives
  }): Promise<ApplicationResponse<null>> {
    try {
      const criteria = new Criteria({ id: params.id })
      const isPermissionExist = await this.shrdRepository.match(criteria, 'permission')

      if (isPermissionExist.length < 0) {
        return {
          message: 'No existe este permiso',
          statusCode: 404,
          data: null
        }
      }

      await this.repository.update(params.id, params.data)

      return { message: 'Datos actualizados', statusCode: 200, data: null }
    } catch (error) {
      console.log(error)
      return {
        message: 'Algo ha salido mal' as string,
        statusCode: 500,
        data: null
      }
    }
  }
}
