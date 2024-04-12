import { type User as UserEntity } from '@prisma/client'
import { RequestType } from '@src/shared/modules'
import { Response } from 'express'
import { inject } from 'inversify'
import { controller, httpPost, httpPatch } from 'inversify-express-utils'
import { AuthLogin, AuthRegister, RecoverPassword, SendEmailToRecoverPwd } from '../../context/application'

@controller('/auth')
export class AuthController {
  constructor (
    @inject(AuthRegister) private readonly authRegister: AuthRegister,
    @inject(AuthLogin) private readonly authLogin: AuthLogin,
    @inject(SendEmailToRecoverPwd) private readonly sendEmailToRecoverPwd: SendEmailToRecoverPwd,
    @inject(RecoverPassword) private readonly recoverPassword: RecoverPassword
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
    const response = await this.sendEmailToRecoverPwd.run(req.body)
    return res.status(response.statusCode).json(response)
  }

  @httpPatch('/login/reset-password')
  async updatePassword (req: RequestType<{ password: string, email: string }>, res: Response): Promise<any> {
    const response = await this.recoverPassword.run({ email: req.body.email, password: req.body.password })
    return res.status(response.statusCode).json(response)
  }
}
