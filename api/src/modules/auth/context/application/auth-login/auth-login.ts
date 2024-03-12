import { type ApplicationResponse } from '@src/shared/modules'
import { inject, injectable } from 'inversify'
import {
  AuthRepository
} from '../../domain'
import { TYPES } from '../../utils/constants'
import { DigestStrategy, EmailStrategy } from './auth-strategy'
import { Criteria } from '@src/shared/modules/context/domain/criteria'

@injectable()
export class AuthLogin {
  private ctx?: string

  constructor (@inject(TYPES.AuthRepository) private readonly repository: AuthRepository) {}

  async run (params: {
    ci?: number
    email?: string
    password: string
  }): Promise<ApplicationResponse<any>> {
    try {
      const filter = !params.ci ? { email: params.email } : { ci: params.ci }
      const criteria = new Criteria(filter)
      const foundUser = await this.repository.match(criteria)

      if (!foundUser) {
        return { message: 'Usuario y/o clave invalidas', statusCode: 404, data: null }
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
      return { message: 'Algo ha salido mal, intente mas tarde' as string, statusCode: 500, data: null }
    }
  }

  public setStrategy (ctx: string): void {
    this.ctx = ctx
  }
}
