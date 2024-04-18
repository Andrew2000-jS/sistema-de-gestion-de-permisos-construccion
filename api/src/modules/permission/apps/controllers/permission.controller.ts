import {
  PermissionCreator,
  PermissionDeleter,
  PermissionUpdater
} from '@src/permission/context/application'
import { type PermissionPrimitives } from '@src/permission/context/domain'
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

@controller('/permissions')
export class PermissionController {
  constructor (
    @inject(PermissionCreator)
    private readonly permissionCreator: PermissionCreator,
    @inject(PermissionDeleter)
    private readonly permissionDeleter: PermissionDeleter,
    @inject(PermissionUpdater)
    private readonly permissionUpdater: PermissionUpdater,
    @inject(Matcher)
    private readonly permissionMatcher: Matcher
  ) {}

  @httpPost('/create')
  async createPermission (
    req: RequestType<PermissionPrimitives>,
    res: Response
  ): Promise<any> {
    const response = await this.permissionCreator.run(req.body)
    return res.status(response.statusCode).json(response)
  }

  @httpDelete('/delete/:id')
  async deletePermission (
    req: Request,
    res: Response
  ): Promise<any> {
    const { id } = req.params
    const response = await this.permissionDeleter.run({ id: Number(id) })
    return res.status(response.statusCode).json(response)
  }

  @httpPatch('/update/:id')
  async updatePermission (
    req: RequestType<{ data: PermissionPrimitives }>,
    res: Response
  ): Promise<any> {
    const { id } = req.params
    const { data } = req.body
    const response = await this.permissionUpdater.run({ id: Number(id), data })
    return res.status(response.statusCode).json(response)
  }

  @httpPost('/filter')
  async matchPermission (
    req: RequestType<Criteria>,
    res: Response
  ): Promise<any> {
    const response = await this.permissionMatcher.run(req.body, 'permission')
    return res.status(response.statusCode).json(response)
  }
}
