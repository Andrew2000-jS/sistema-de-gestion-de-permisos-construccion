import { type ApplicationResponse } from '@src/shared/modules'
import { inject, injectable } from 'inversify'
import {
  AuthRepository
} from '../../domain'
import { TYPES } from '../../utils/constants'
import { DigestStrategy, EmailStrategy } from './auth-strategy'

@injectable()
export class AuthLogin {
  private ctx?: string

  constructor (@inject(TYPES.AuthRepository) private readonly repository: AuthRepository) {}

  async run (params: {
    ci: number
    password: string
  }): Promise<ApplicationResponse<string>> {
    try {
      const foundUser = await this.repository.findByCi(params.ci)

      if (!foundUser) {
        return { message: 'Usuario no encontrado', statusCode: 404, data: null }
      }

      let strategy

      if (this.ctx === 'digest') {
        strategy = new DigestStrategy(params.password)
      } else {
        strategy = new EmailStrategy(foundUser.email)
      }

      const authReponse = strategy.execute(foundUser)

      return authReponse
    } catch (error) {
      console.log(error)
      return { message: 'Ocurrió un error desconocido' as string, statusCode: 500, data: null }
    }
  }

  public setStrategy (ctx: string): void {
    this.ctx = ctx
  }
}
