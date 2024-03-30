import { inject, injectable } from 'inversify'
import { AuthRepository } from '../../domain'
import { TYPES } from '../../utils'
import { sendEmail, type ApplicationResponse } from '@src/shared/modules'
import { Criteria } from '@src/shared/modules/context/domain/criteria'
import { v4 } from 'uuid'

@injectable()
export class SendEmailToRecoverPwd {
  constructor (
    @inject(TYPES.AuthRepository) private readonly repository: AuthRepository
  ) {}

  async run (params: { email: string }): Promise<ApplicationResponse<any>> {
    try {
      const criteria = new Criteria(params)
      const foundUser = await this.repository.match(criteria)

      if (!foundUser) {
        return {
          message: 'Usuario no encontrado',
          statusCode: 404,
          data: null
        }
      }

      const sessionCode = v4().substring(0, 8)
      const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Recuperación de clave</title>
      </head>
      <body>
        <p>Su código de verificación es el siguiente.</p>
        <h1>${sessionCode}</h1>
      </body>
      </html>
      `
      await sendEmail({ to: params.email, html, subject: 'Recuperación de clave' })

      return {
        message: 'Verifique su correo electronico',
        statusCode: 200,
        data: { sessionCode }
      }
    } catch (error) {
      console.log(error)
      return {
        message: 'No se ha podido enviar el correo electronico' as string,
        statusCode: 500,
        data: null
      }
    }
  }
}
