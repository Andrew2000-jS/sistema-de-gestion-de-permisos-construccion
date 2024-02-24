import { type ApplicationResponse, type Nullable } from '@src/shared/modules'
import { type User, type UserRepository } from '../domain'
import { inject, injectable } from 'inversify'
import { TYPES } from '../utils/constants'

@injectable()
export class UserDeleter {
  constructor (@inject(TYPES.UserRepository) private readonly repository: UserRepository) {}

  async run (id: number): Promise<ApplicationResponse<User>> {
    try {
      const user = await this.isUserExist(id)
      if (!user) {
        return {
          message: 'Usuario no encontrado',
          statusCode: 404,
          data: null
        }
      }

      await this.repository.delete(user.toPrimitives().id)

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

  async isUserExist (id: number): Promise<Nullable<User>> {
    try {
      const foundUser = await this.repository.findById(id)
      return foundUser
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  }
}
