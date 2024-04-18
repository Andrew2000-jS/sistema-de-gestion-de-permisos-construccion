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
import { Construction } from '@src/construction/context/domain'
import { Owner } from '@src/owner/context/domain'

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
  ): Promise<ApplicationResponse<Permission>> {
    try {
      const criteria = new Criteria({ receiptNo: data.receiptNo })
      const isPermissionExist = await this.shrdRepository.match(criteria, 'permission')

      if (isPermissionExist.length > 0) {
        return { message: 'El permiso ya existe', statusCode: 409, data: null }
      }

      const newPermission = Permission.create(
        new IdValueObject(0),
        data.date,
        new PositiveNumberValueObject(data.quantity),
        new PositiveNumberValueObject(data.amount),
        data.CIV,
        new StringValueObject(data.observation),
        new StringValueObject(data.receiptNo),
        Construction.fromPrimitives(data.construction),
        Owner.fromPrimitives(data.owner),
        new EnumValueObject(data.status, [Status.PENDING])
      )
      await this.repository.save(newPermission)
      return {
        message: 'Permiso generado con exito!',
        statusCode: 200,
        data: null
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
