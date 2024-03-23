import { inject, injectable } from 'inversify'
import { AuthRepository } from '../../domain'
import { TYPES } from '../../utils'
import { type ApplicationResponse } from '@src/shared/modules'
import { Criteria } from '@src/shared/modules/context/domain/criteria'
import { UserPassword } from '@src/user/context/domain'

@injectable()
export class RecoverPassword {
  constructor (
    @inject(TYPES.AuthRepository) private readonly repository: AuthRepository
  ) {}

  async run (params: { email: string, password: string }): Promise<ApplicationResponse<any>> {
    const { email, password } = params
    const criteria = new Criteria({ email })
    const foundUser = await this.repository.match(criteria)

    if (!foundUser) {
      return { message: 'No autorizado', statusCode: 401, data: null }
    }

    const encryptedPassword = new UserPassword(password)

    try {
      await this.repository.recover(email, encryptedPassword.getValue())
      return { message: 'Clave actulizada', statusCode: 200, data: null }
    } catch (error) {
      return { message: 'No se ha podido actualizar la clave', statusCode: 500, data: null }
    }
  }
}
