import {
  type ApplicationResponse,
  SharedRepository,
  TYPES as SharedTypes
} from '@src/shared/modules'
import { type UserPrimitives, type UserRepository } from '../../domain'
import { inject, injectable } from 'inversify'
import { TYPES as UserTypes } from '../../utils/constants'
import { Criteria } from '@src/shared/modules/context/domain/criteria'

@injectable()
export class UserUpdater {
  constructor (
    @inject(UserTypes.UserRepository) private readonly repository: UserRepository,
    @inject(SharedTypes.SharedRepository)
    private readonly shrdRepository: SharedRepository
  ) {}

  async run (
    id: string,
    data: UserPrimitives
  ): Promise<ApplicationResponse<UserPrimitives>> {
    try {
      const criteria = new Criteria({ id })
      const isUserExist = await this.shrdRepository.match(criteria, 'user')

      if (isUserExist.length < 0) {
        return {
          message: 'Usuario no encontrado',
          statusCode: 404,
          data: null
        }
      }

      const updatedUser = await this.repository.update(id, data)

      return {
        message: 'Usuario actualizado, por favor cierre sesion par ver los cambios',
        statusCode: 200,
        data: updatedUser
      }
    } catch (error) {
      console.log(error)
      return {
        message: 'Ocurrió un error desconocido' as string,
        statusCode: 500,
        data: null
      }
    }
  }
}
