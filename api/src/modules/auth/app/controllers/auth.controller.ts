import { type User as UserEntity } from '@prisma/client'
import { RequestType, authorization } from '@src/shared/modules'
import { Response } from 'express'
import { inject } from 'inversify'
import { controller, httpPost, httpPatch } from 'inversify-express-utils'
import { AuthLogin, AuthRegister, RecoverPassword, SendEmailToRecoverPwd } from '../../context/application'

let token: string | null = null

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
    if (ctx === 'email') {
      token = !data ? { token: '' } : data.token
      if (data) {
        res.cookie(
          'sesion-data',
          { code: data!.sesionCode, ctx: 'login' },
          { maxAge: 900000, secure: false, httpOnly: false }
        )
      }
    } else if (ctx === 'digest') {
      res.cookie(
        'sesion-data',
        { token: data },
        { maxAge: 900000, secure: false, httpOnly: false, domain: 'localhost' }
      )
    }

    return res.status(statusCode).json({ message, statusCode, data })
  }

  @httpPost('/login/send-email')
  async sendEmail (
    req: RequestType<{ email: string }>,
    res: Response
  ): Promise<any> {
    const response = await this.sendEmailToRecoverPwd.run(req.body)
    const { data } = response
    if (data) {
      token = data.token
      res.cookie(
        'sesion-data',
        { code: data!.sesionCode, ctx: 'recovery_password' },
        { maxAge: 900000, secure: false, httpOnly: false }
      )
    }
    return res.status(response.statusCode).json(response)
  }

  @httpPost('/login/code')
  async loginCode (
    req: RequestType<{ code: string, ctx: string }>,
    res: Response
  ): Promise<any> {
    const { code } = req.body

    if (code !== req.cookies['sesion-data'].code) {
      return res
        .status(401)
        .json({ message: 'Codigo incorrecto', statusCode: 401, data: null })
    }
    res.cookie(
      'sesion-data',
      { token },
      { maxAge: 900000, secure: false, httpOnly: false }
    )
    return res
      .status(200)
      .json({
        message: 'Seras redirigido!',
        statusCode: 200,
        data: req.cookies['sesion-data'].token
      })
  }

  @httpPatch('/login/reset-password', authorization)
  async updatePassword (req: RequestType<{ password: string }>, res: Response): Promise<any> {
    const response = await this.recoverPassword.run({ email: req.userInfo.userEmail, password: req.body.password })
    return res.status(response.statusCode).json(response)
  }
}
