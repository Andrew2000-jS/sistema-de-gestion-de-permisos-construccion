import { type ApplicationResponse } from '@src/shared/modules'
import { type EmailAuthStrategy } from './interfaces'
import { type UserPrimitives } from '@src/auth/context/domain'

export class EmailStrategy implements EmailAuthStrategy {
  constructor (public email: string) {}

  execute (user: UserPrimitives): ApplicationResponse<any> {
    console.log(user)
    return { message: 'Email enviado', statusCode: 200, data: null }
  }
}
