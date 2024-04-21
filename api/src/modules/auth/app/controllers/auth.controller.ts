import { type User as UserEntity } from '@prisma/client'
import { RequestType } from '@src/shared/modules'
import { Response } from 'express'
import { inject } from 'inversify'
import { controller, httpPost, httpPatch } from 'inversify-express-utils'
import { AuthLogin, AuthRegister, RecoverPassword } from '../../context/application'
import { v4 } from 'uuid'
import { EmailNotification } from '@src/shared/modules/context/application/notfications'

@controller('/auth')
export class AuthController {
  constructor (
    @inject(AuthRegister) private readonly authRegister: AuthRegister,
    @inject(AuthLogin) private readonly authLogin: AuthLogin,
    @inject(RecoverPassword) private readonly recoverPassword: RecoverPassword,
    @inject(EmailNotification) private readonly emailNotification: EmailNotification
  ) {}

  @httpPost('/register')
  async register (req: RequestType<UserEntity>, res: Response): Promise<any> {
    const response = await this.authRegister.run(req.body)
    return res.status(response.statusCode).json(response)
  }

  @httpPost('/login')
  async login (
    req: RequestType<{
      ci?: number
      email?: string
      password: string
      ctx: string
    }>,
    res: Response
  ): Promise<any> {
    const { ci, password, email, ctx } = req.body

    this.authLogin.setStrategy(ctx)
    const { statusCode, message, data } = await this.authLogin.run({
      ci,
      email,
      password
    })
    return res.status(statusCode).json({ message, statusCode, data })
  }

  @httpPost('/login/send-email')
  async sendEmail (
    req: RequestType<{ email: string }>,
    res: Response
  ): Promise<any> {
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

    const response = await this.emailNotification.run({ email: req.body.email, html, subject: 'Recuperación de clave', type: 'user' })
    return res.status(response.statusCode).json(response)
  }

  @httpPatch('/login/reset-password')
  async updatePassword (req: RequestType<{ password: string, email: string }>, res: Response): Promise<any> {
    const response = await this.recoverPassword.run({ email: req.body.email, password: req.body.password })
    return res.status(response.statusCode).json(response)
  }
}
