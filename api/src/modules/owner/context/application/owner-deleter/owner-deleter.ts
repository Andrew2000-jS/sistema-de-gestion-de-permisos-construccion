import { OwnerRepository } from '@src/owner/context/domain'
import {
  SharedRepository,
  TYPES as SharedTypes,
  type ApplicationResponse
} from '@src/shared/modules'

import { inject, injectable } from 'inversify'
import { TYPES as OwnerTypes } from '../../utils'
import { Criteria } from '@src/shared/modules/context/domain/criteria'

@injectable()
export class OwnerDeleter {
  constructor (
    @inject(OwnerTypes.OwnerRepository)
    private readonly repository: OwnerRepository,
    @inject(SharedTypes.SharedRepository)
    private readonly shrdRepository: SharedRepository
  ) {}

  async run (id: string): Promise<ApplicationResponse<null>> {
    try {
      const criteria = new Criteria({ id })
      const isOwnerExist = await this.shrdRepository.match(criteria, 'owner')
      if (isOwnerExist.length < 0) {
        return {
          message: 'Este propietario no existe',
          statusCode: 404,
          data: null
        }
      }
      await this.repository.delete(id)
      return {
        message: 'Propietario eliminado con exito!',
        statusCode: 204,
        data: null
      }
    } catch (error) {
      console.log(error)
      return {
        message: 'No se ha podido eliminar al propietario',
        statusCode: 500,
        data: null
      }
    }
  }
}
