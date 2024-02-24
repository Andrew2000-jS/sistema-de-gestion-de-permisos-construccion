import { type ApplicationResponse } from '@src/shared/modules'
import { inject, injectable } from 'inversify'
import {
  User,
  UserCi,
  UserEmail,
  UserId,
  UserName,
  UserPassword,
  AuthRepository
} from '../../domain'
import { TYPES } from '../../utils/constants'
import { errorHandler } from './error-hanlder'

@injectable()
export class AuthRegister {
  constructor (@inject(TYPES.AuthRepository) private readonly repository: AuthRepository) {}

  async run (params: {
    ci: number
    name: string
    lastname: string
    email: string
    password: string
  }): Promise<ApplicationResponse<User>> {
    try {
      const user = User.create(
        new UserId(0),
        new UserCi(params.ci),
        new UserName(params.name),
        new UserName(params.lastname),
        new UserEmail(params.email),
        new UserPassword(params.password)
      )

      await this.repository.register(user)

      return { message: 'Usuario Creado', statusCode: 201, data: user }
    } catch (error: any) {
      return errorHandler(error.name, error.message as string)
    }
  }
}
