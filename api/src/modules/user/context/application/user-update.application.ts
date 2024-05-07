import { type ApplicationResponse, type Nullable } from '@src/shared/modules'
import { type User, type UserRepository } from '../domain'
import { inject, injectable } from 'inversify'
import { TYPES } from '../utils/constants'

@injectable()
export class UserUpdater {
  constructor (@inject(TYPES.UserRepository) private readonly repository: UserRepository) {}

  async run (id: string, params: { ci: number, name: string, lastname: string, email: string, password: string }): Promise<ApplicationResponse<User>> {
    try {
      const user = await this.isUserExist(id)

      if (!user) {
        return {
          message: 'Usuario no encontrado',
          statusCode: 404,
          data: null
        }
      }

      const updatedUser = await this.repository.update(user.toPrimitives().id, {
        ci: params.ci ?? user.toPrimitives().ci,
        name: params.name ?? user.toPrimitives().name,
        lastname: params.lastname ?? user.toPrimitives().lastname,
        email: params.email ?? user.toPrimitives().email,
        password: params.password ?? user.toPrimitives().email
      })

      return {
        message: 'Usuario actualizado',
        statusCode: 200,
        data: updatedUser
      }
    } catch (error) {
      console.log(error)
      return { message: 'Ocurrió un error desconocido' as string, statusCode: 500, data: null }
    }
  }

  async isUserExist (id: string): Promise<Nullable<User>> {
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
