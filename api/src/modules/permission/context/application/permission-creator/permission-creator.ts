import {
  SharedRepository,
  TYPES as SharedTypes,
  type ApplicationResponse
} from '@src/shared/modules'
import {
  Permission,
  Status,
  type PermissionPrimitives,
  type PermissionRepository
} from '../../domain'
import { inject, injectable } from 'inversify'
import { TYPES as PermissionTypes } from '../../utils'
import {
  EnumValueObject,
  IdValueObject,
  PositiveNumberValueObject,
  StringValueObject
} from '@src/shared/modules/context/domain/value-object'
import { Criteria } from '@src/shared/modules/context/domain/criteria'
import { PermissionIdValueObject } from '../../domain/permission-id-value-object'

@injectable()
export class PermissionCreator {
  constructor (
    @inject(PermissionTypes.PermissionRepository)
    private readonly repository: PermissionRepository,
    @inject(SharedTypes.SharedRepository)
    private readonly shrdRepository: SharedRepository
  ) {}

  async run (
    data: PermissionPrimitives
  ): Promise<ApplicationResponse<PermissionPrimitives>> {
    console.log('permission', data)
    try {
      const criteria = new Criteria({ receiptNo: data.receiptNo })
      const isPermissionExist = await this.shrdRepository.match(criteria, 'permission')

      if (isPermissionExist.length > 0) {
        return { message: 'El permiso ya existe', statusCode: 409, data: null }
      }

      const newPermission = Permission.create(
        new PermissionIdValueObject(0),
        data.date,
        new PositiveNumberValueObject(data.quantity),
        new PositiveNumberValueObject(data.amount),
        new StringValueObject(data.CIV),
        new StringValueObject(data.observation),
        new StringValueObject(data.receiptNo),
        new IdValueObject(data.constructionId),
        new IdValueObject(data.ownerId),
        new EnumValueObject(data.status, [Status.PENDING])
      )
      await this.repository.save(newPermission)
      return {
        message: 'Permiso generado con exito!',
        statusCode: 200,
        data: newPermission.toPrimitives()
      }
    } catch (error) {
      console.log(error)
      return {
        message: 'No se ha podido crear el permiso',
        statusCode: 500,
        data: null
      }
    }
  }
}
