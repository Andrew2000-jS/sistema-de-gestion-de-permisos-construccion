import { inject, injectable } from 'inversify'
import { TYPES as PermissionTypes } from '../../utils'
import { PermissionRepository } from '../../domain'
import { Criteria } from '@src/shared/modules/context/domain/criteria'
import {
  SharedRepository,
  TYPES as SharedTypes,
  type ApplicationResponse
} from '@src/shared/modules'

@injectable()
export class PermissionDeleter {
  constructor (
    @inject(PermissionTypes.PermissionRepository)
    private readonly repository: PermissionRepository,
    @inject(SharedTypes.SharedRepository)
    private readonly shrdRepository: SharedRepository
  ) {}

  async run (params: { id: number }): Promise<ApplicationResponse<null>> {
    try {
      const criteria = new Criteria({ id: params.id })
      const isPermissionExist = await this.shrdRepository.match(
        criteria,
        'permission'
      )

      if (isPermissionExist.length === 0) {
        return {
          message: 'No existe este permiso',
          statusCode: 404,
          data: null
        }
      }
      await this.repository.delete(params.id)
      return { message: 'Permiso eliminado', statusCode: 204, data: null }
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
