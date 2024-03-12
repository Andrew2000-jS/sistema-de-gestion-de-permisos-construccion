import { inject, injectable } from 'inversify'
import { AuthRepository } from '../../domain'
import { TYPES, sendGmail } from '../../utils'
import { type ApplicationResponse } from '@src/shared/modules'
import { Criteria } from '@src/shared/modules/context/domain/criteria'
import { v4 } from 'uuid'

@injectable()
export class RecoverPassword {
  constructor (
    @inject(TYPES.AuthRepository) private readonly repository: AuthRepository
  ) {}

  async run (params: { email: string }): Promise<ApplicationResponse<string>> {
    try {
      const criteria = new Criteria(params)
      const foundUser = await this.repository.match(criteria)
      const recoveryCode = v4().substring(0, 4)

      if (!foundUser) {
        return {
          message: 'Usuario no encontrado',
          statusCode: 404,
          data: null
        }
      }

      await this.sendEmail(recoveryCode, params.email)

      return {
        message: 'El codigo ha sido enviado a su correo electronico',
        statusCode: 200,
        data: recoveryCode
      }
    } catch (error) {
      console.log(error)
      return {
        message: 'Ocurrió un error desconocido' as string,
        statusCode: 500,
        data: null
      }
    }
  }

  private async sendEmail (code: string, to: string): Promise<void> {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Código de verificación</title>
    </head>
    <body>
      <p>Su código de verificación es el siguiente.</p>
      <h1>${code}</h1>
    </body>
    </html>
    `
    const auth = {
      user: 'alcaldiacarirubanabot@gmail.com',
      pass: 'snza gbhs aval rovd'
    }

    await sendGmail({
      html,
      auth,
      from: auth.user,
      to,
      subject: 'Código de verificación'
    })
  }
}
