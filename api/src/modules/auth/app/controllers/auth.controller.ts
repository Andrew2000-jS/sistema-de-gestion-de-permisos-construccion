import { type User as UserEntity } from '@prisma/client'
import { RequestType } from '@src/shared/modules'
import { Response } from 'express'
import { inject } from 'inversify'
import { controller, httpPost } from 'inversify-express-utils'
import { AuthLogin, AuthRegister, RecoverPassword } from '../../context/application'

let token: string | null = null

@controller('/auth')
export class AuthController {
  constructor (
    @inject(AuthRegister) private readonly authRegister: AuthRegister,
    @inject(AuthLogin) private readonly authLogin: AuthLogin,
    @inject(RecoverPassword) private readonly recoveryPassword: RecoverPassword
  ) {}

  @httpPost('/register')
  async register (req: RequestType<UserEntity>, res: Response): Promise<any> {
    const response = await this.authRegister.run(req.body)
    return res.status(response.statusCode).json(response)
  }

  @httpPost('/login')
  async login (
    req: RequestType<{ ci?: number, email?: string, password: string, ctx: string }>,
    res: Response
  ): Promise<any> {
    const { ci, password, email, ctx } = req.body

    this.authLogin.setStrategy(ctx)
    const { statusCode, message, data } = await this.authLogin.run({ ci, email, password })
    if (ctx === 'email') {
      token = !data ? { token: '' } : data.token
      if (data) {
        res.cookie('sesion-data', { code: data!.sesionCode }, { maxAge: 900000, secure: false, httpOnly: false })
      }
    } else if (ctx === 'digest') {
      res.cookie('sesion-data', { token: data }, { maxAge: 900000, secure: false, httpOnly: false })
    }

    return res.status(statusCode).json({ message, statusCode, data })
  }

  @httpPost('/login/code')
  async loginCode (
    req: RequestType<{ code: string }>,
    res: Response
  ): Promise<any> {
    const { code } = req.body
    if (code !== req.cookies['sesion-data'].code) { return res.status(401).json({ message: 'Codigo incorrecto', statusCode: 401, data: null }) }
    console.log(token)
    res.cookie('sesion-data', { token }, { maxAge: 900000, secure: false, httpOnly: false })
    return res.status(200).json({ message: 'Bienvenido', statusCode: 200, data: req.cookies['sesion-data'].token })
  }

  @httpPost('/recovery')
  async recovery (
    req: RequestType<{ email: string }>,
    res: Response
  ): Promise<any> {
    const { data, message, statusCode } = await this.recoveryPassword.run(req.body)
    res.cookie('recovery-code', { data }, { maxAge: 900000, secure: false, httpOnly: false })
    return res.status(statusCode).json({ message, statusCode, data })
  }
}
