import { sendGmail, type ApplicationResponse } from '@src/shared/modules'
import { type EmailAuthStrategy } from './interfaces'
import { generateToken } from '@src/auth/context/utils'
import { v4 } from 'uuid'
import { type UserPrimitives } from '@src/user/context/domain'

export class EmailStrategy implements EmailAuthStrategy {
  constructor (public email: string) {}

  async execute (user: UserPrimitives): Promise<ApplicationResponse<any>> {
    try {
      const sessionCode = v4().substring(0, 6)
      const token = generateToken(
        {
          userCi: user.ci,
          userEmail: user.email,
          userName: `${user.name} ${user.lastname}`,
          ctx: 'login'
        },
        '3g8rgz4G7NH4',
        '24h'
      )
      const data = { sessionCode, token }
      const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Código de verificación</title>
      </head>
      <body>
        <p>Su código de verificación es el siguiente.</p>
        <h1>${sessionCode}</h1>
      </body>
      </html>
      `
      const auth = {
        user: 'alcaldiacarirubanabot@gmail.com',
        pass: 'snza gbhs aval rovd'
      }

      await sendGmail({
        to: this.email,
        subject: 'Inicio de Sesion',
        html,
        auth,
        from: 'alcaldiacarirubanabot@gmail.com'
      })

      return { message: 'Correo enviado', statusCode: 200, data }
    } catch (error) {
      console.log(error)
      return { message: 'Algo ha salido mal', statusCode: 500, data: null }
    }
  }
}
