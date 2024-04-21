import { Matcher, RequestType } from '@src/shared/modules'
import { type Criteria } from '@src/shared/modules/context/domain/criteria'
import { Request, Response } from 'express'
import { inject } from 'inversify'
import {
  controller,
  httpDelete,
  httpPatch,
  httpPost
} from 'inversify-express-utils'
import { OwnerCreator, OwnerDeleter, OwnerUpdater } from '../context/application'
import { type OwnerPrimitives } from '../context/domain'

@controller('/owner')
export class OwnerController {
  constructor (
    @inject(OwnerCreator)
    private readonly ownerCreator: OwnerCreator,
    @inject(OwnerDeleter)
    private readonly ownerDeleter: OwnerDeleter,
    @inject(OwnerUpdater)
    private readonly ownerUpdater: OwnerUpdater,
    @inject(Matcher)
    private readonly ownerMatcher: Matcher
  ) {}

  @httpPost('/create')
  async createOwner (
    req: RequestType<OwnerPrimitives>,
    res: Response
  ): Promise<any> {
    const response = await this.ownerCreator.run(req.body)
    return res.status(response.statusCode).json(response)
  }

  @httpDelete('/delete/:id')
  async deleteOwner (
    req: Request,
    res: Response
  ): Promise<any> {
    const { id } = req.params
    const response = await this.ownerDeleter.run(Number(id))
    return res.status(response.statusCode).json(response)
  }

  @httpPatch('/update/:id')
  async updateOwner (
    req: RequestType<{ data: OwnerPrimitives }>,
    res: Response
  ): Promise<any> {
    const { id } = req.params
    const { data } = req.body
    const response = await this.ownerUpdater.run(Number(id), data)
    return res.status(response.statusCode).json(response)
  }

  @httpPost('/filter')
  async matchOwner (
    req: RequestType<Criteria>,
    res: Response
  ): Promise<any> {
    const response = await this.ownerMatcher.run(req.body, 'owner')
    return res.status(response.statusCode).json(response)
  }
}
