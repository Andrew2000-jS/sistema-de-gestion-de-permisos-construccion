import { sendEmail, type ApplicationResponse } from '@src/shared/modules'
import { type EmailAuthStrategy } from './interfaces'
import { generateToken } from '@src/auth/context/utils'
import { v4 } from 'uuid'
import { type UserPrimitives } from '@src/user/context/domain'

export class EmailStrategy implements EmailAuthStrategy {
  constructor (public email: string) {}

  async execute (user: UserPrimitives): Promise<ApplicationResponse<any>> {
    try {
      const sesionCode = v4().substring(0, 6)
      const token = generateToken({ userCi: user.ci, userEmail: user.email, ctx: 'login' }, '3g8rgz4G7NH4', '24h')
      const data = { sesionCode, token }
      const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Código de verificación</title>
      </head>
      <body>
        <p>Su código de verificación es el siguiente.</p>
        <h1>${sesionCode}</h1>
      </body>
      </html>
      `
      await sendEmail({ to: this.email, subject: 'Inicio de Sesion', html })

      return { message: 'Correo enviado', statusCode: 200, data }
    } catch (error) {
      console.log(error)
      return { message: 'Algo ha salido mal', statusCode: 500, data: null }
    }
  }
}
