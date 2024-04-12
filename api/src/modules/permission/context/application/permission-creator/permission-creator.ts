import { type ApplicationResponse } from '@src/shared/modules'
import { Construction, Owner, Permission, Status, type PermissionPrimitives, type PermissionRepository } from '../../domain'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../utils'
import { EnumValueObject, IdValueObject, PositiveNumberValueObject, StringValueObject } from '@src/shared/modules/context/domain/value-object'

@injectable()
export class PermissionCreator {
  constructor (@inject(TYPES.PermissionRepository) private readonly repository: PermissionRepository) {}

  async run (data: PermissionPrimitives): Promise<ApplicationResponse<Permission>> {
    try {
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
      return { message: 'Permiso generado con exito!', statusCode: 200, data: null }
    } catch (error) {
      console.log(error)
      return { message: 'No se ha podido crear el permiso', statusCode: 500, data: null }
    }
  }
}
