import { PermissionCreator } from '@src/permission/context/application'
import { type PermissionPrimitives } from '@src/permission/context/domain'
import { RequestType } from '@src/shared/modules'
import { Response } from 'express'
import { inject } from 'inversify'
import { controller, httpPost } from 'inversify-express-utils'

@controller('/permissions')
export class PermissionController {
  constructor (@inject(PermissionCreator) private readonly permissionCreator: PermissionCreator) {}

  @httpPost('/create')
  async createPermission (req: RequestType<PermissionPrimitives>, res: Response): Promise<any> {
    const response = await this.permissionCreator.run(req.body)
    return res.status(response.statusCode).json(response)
  }
}
