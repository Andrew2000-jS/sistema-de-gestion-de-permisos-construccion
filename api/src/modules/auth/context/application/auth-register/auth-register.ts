import { v4 as uuid } from 'uuid'
import { type ApplicationResponse } from '@src/shared/modules'
import { inject, injectable } from 'inversify'
import {
  User,
  UserEmail,
  UserPassword
} from '@src/user/context/domain'
import { CiValueObject, IdValueObject, NameValueObject } from '@src/shared/modules/context/domain/value-object'
import { TYPES } from '../../utils/constants'
import { errorHandler } from './error-hanlder'
import { Criteria } from '@src/shared/modules/context/domain/criteria'
import { AuthRepository } from '../../domain'

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
      const filter = {
        OR: [
          { email: params.email },
          { ci: params.ci }
        ]
      }
      const criteria = new Criteria(filter)
      const isUserExist = await this.repository.match(criteria)

      if (isUserExist) {
        return { message: 'El usuario ya existe', statusCode: 409, data: null }
      }

      const user = User.create(
        new IdValueObject(uuid()),
        new CiValueObject(params.ci),
        new NameValueObject(params.name),
        new NameValueObject(params.lastname),
        new UserEmail(params.email),
        new UserPassword(params.password)
      )

      await this.repository.register(user)

      return { message: 'Registro existoso!', statusCode: 201, data: user }
    } catch (error: any) {
      return errorHandler(error.name, error.message as string)
    }
  }
}
