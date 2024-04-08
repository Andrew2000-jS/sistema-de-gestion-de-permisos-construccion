import { type ApplicationResponse } from '@src/shared/modules'
import { type PermissionPrimitives, type PermissionRepository } from '../../domain'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../utils'

@injectable()
export class PermissionCreator {
  constructor (@inject(TYPES.PermissionRepository) private readonly repository: PermissionRepository) {}

  async run (data: PermissionPrimitives): Promise<ApplicationResponse<null>> {
    try {
      await this.repository.save(data)
      return { message: 'Permiso generado con exito!', statusCode: 200, data: null }
    } catch (error) {
      console.log(error)
      return { message: 'No se ha podido crear el permiso', statusCode: 500, data: null }
    }
  }
}
