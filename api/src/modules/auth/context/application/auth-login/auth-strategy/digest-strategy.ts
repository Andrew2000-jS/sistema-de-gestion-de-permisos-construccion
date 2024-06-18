import { type ApplicationResponse } from '@src/shared/modules'
import { type DigestAuthStrategy } from './interfaces'
import { generateToken } from '@src/auth/context/utils/token'
import { UserPassword, type UserPrimitives } from '@src/user/context/domain'

export class DigestStrategy implements DigestAuthStrategy {
  constructor (public password: string) {}

  execute (user: UserPrimitives): ApplicationResponse<any> {
    const comparedPass = UserPassword.comparePassword(
      this.password,
      user.password
    )

    if (!comparedPass) {
      return {
        message: 'Usuario y/o clave invalidas',
        statusCode: 401,
        data: null
      }
    }

    const token = generateToken(
      {
        userCi: user.ci,
        userId: user.id,
        userEmail: user.email,
        userName: `${user.name} ${user.lastname}`,
        ctx: 'login'
      },
      '3g8rgz4G7NH4',
      '24h'
    )

    return { message: 'Bienvenido', statusCode: 200, data: token }
  }
}
