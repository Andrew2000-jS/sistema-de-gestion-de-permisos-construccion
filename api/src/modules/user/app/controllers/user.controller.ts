import { Matcher, RequestType } from '@src/shared/modules'
import { type Criteria } from '@src/shared/modules/context/domain/criteria'
import { UserDeleter, UserUpdater } from '@src/user/context/application'
import { type UserPrimitives } from '@src/user/context/domain'
import { Request, Response } from 'express'
import { inject } from 'inversify'
import { controller, httpDelete, httpPatch, httpPost } from 'inversify-express-utils'

@controller('/user')
export class UserController {
  constructor (
    @inject(UserUpdater)
    private readonly userUpdater: UserUpdater,
    @inject(UserDeleter)
    private readonly userDeleter: UserDeleter,
    @inject(Matcher)
    private readonly userMatcher: Matcher
  ) {}

  @httpPatch('/update/:id')
  async updateUser (
    req: RequestType<{ data: UserPrimitives }>,
    res: Response
  ): Promise<any> {
    const { id } = req.params
    const { data } = req.body
    const response = await this.userUpdater.run(id, data)
    return res.status(response.statusCode).json(response)
  }

  @httpDelete('/delete/:id')
  async deleteUser (
    req: Request,
    res: Response
  ): Promise<any> {
    const { id } = req.params
    const response = await this.userDeleter.run(id)
    return res.status(response.statusCode).json(response)
  }

  @httpPost('/filter')
  async matchUser (
    req: RequestType<Criteria>,
    res: Response
  ): Promise<any> {
    const response = await this.userMatcher.run(req.body, 'user')
    return res.status(response.statusCode).json(response)
  }
}
