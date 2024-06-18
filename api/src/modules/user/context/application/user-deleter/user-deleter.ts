import {
  type ApplicationResponse,
  SharedRepository,
  TYPES as SharedTypes
} from '@src/shared/modules'
import { type User, type UserRepository } from '../../domain'
import { inject, injectable } from 'inversify'
import { TYPES as UserTypes } from '../../utils/constants'
import { Criteria } from '@src/shared/modules/context/domain/criteria'

@injectable()
export class UserDeleter {
  constructor (@inject(UserTypes.UserRepository) private readonly repository: UserRepository,
    @inject(SharedTypes.SharedRepository)
    private readonly shrdRepository: SharedRepository) {}

  async run (id: string): Promise<ApplicationResponse<User>> {
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

      await this.repository.delete(id)

      return {
        message: 'Usuario eliminado',
        statusCode: 204,
        data: null
      }
    } catch (error) {
      console.log(error)
      return { message: 'Ocurrió un error desconocido' as string, statusCode: 500, data: null }
    }
  }
}
