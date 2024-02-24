import { type User as UserEntity } from '@prisma/client'
import { RequestType } from '@src/shared/modules'
import { Response } from 'express'
import { inject } from 'inversify'
import { controller, httpGet, httpPost } from 'inversify-express-utils'
import { AuthLogin, AuthRegister } from '../../context/application'

@controller('/auth')
export class AuthController {
  constructor (
    @inject(AuthRegister) private readonly authRegister: AuthRegister,
    @inject(AuthLogin) private readonly authLogin: AuthLogin
  ) {}

  @httpPost('/register')
  async register (req: RequestType<UserEntity>, _: Response): Promise<any> {
    const res = await this.authRegister.run(req.body)
    return res
  }

  @httpPost('/login')
  async login (
    req: RequestType<{ ci: number, password: string, ctx: string }>,
    _: Response
  ): Promise<any> {
    const { ci, password, ctx } = req.body

    this.authLogin.setStrategy(ctx)
    const res = await this.authLogin.run({ ci, password })
    return res
  }

  @httpGet('/health-check')
  async healthCheck (_: Request, res: Response): Promise<Response> {
    return res.status(200).send('Ok')
  }
}
