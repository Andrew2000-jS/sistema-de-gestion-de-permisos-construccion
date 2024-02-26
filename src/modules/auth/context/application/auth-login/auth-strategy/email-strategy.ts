import nodemailer from 'nodemailer'
import { type ApplicationResponse } from '@src/shared/modules'
import { type EmailAuthStrategy } from './interfaces'
import { type UserPrimitives } from '@src/auth/context/domain'
import { generateToken } from '@src/auth/context/utils/token'

export class EmailStrategy implements EmailAuthStrategy {
  constructor (public email: string) {}

  execute (user: UserPrimitives): ApplicationResponse<any> {
    try {
      const token = generateToken({ userCi: user.ci, userEmail: user.email }, '3g8rgz4G7NH4', '1h')
      const loginUrl = `${process.env.DOMAIN_URL_DEV}/auth/login?token=${token}`
      const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Iniciar Sesión</title>
    </head>
    <body>
      <h1>Utilice este enlace para iniciar sesión.</h1>
      <p>Utilice el siguiente enlace para iniciar sesión en la aplicación:</p>
      <form action=${loginUrl} method="POST">
        <button>Iniciar sesión</a>
      </form>
    </body>
    </html>
    `
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'alcaldiacarirubanabot@gmail.com',
          pass: 'snza gbhs aval rovd'
        }
      })

      const mailOptions = {
        from: 'alcaldiacarirubanabot@gmail.com',
        to: this.email,
        subject: 'Inicio de Sesión',
        html
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Ocurrio un error al enviar el email:', error)
        } else {
          console.log('Email enviado: ' + info.response)
        }
      })

      return { message: 'Autorizado', statusCode: 200, data: null }
    } catch (error) {
      console.log(error)
      return { message: 'Algo ha salido mal', statusCode: 500, data: null }
    }
  }
}
