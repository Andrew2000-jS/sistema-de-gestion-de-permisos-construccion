import { v4 as uuid } from 'uuid'
import {
  Owner,
  type OwnerPrimitives,
  OwnerRepository
} from '@src/owner/context/domain'
import {
  SharedRepository,
  TYPES as SharedTypes,
  type ApplicationResponse
} from '@src/shared/modules'
import {
  CiValueObject,
  IdValueObject,
  NameValueObject,
  StringValueObject
} from '@src/shared/modules/context/domain/value-object'
import { inject, injectable } from 'inversify'
import { TYPES as OwnerTypes } from '../../utils'
import { Criteria } from '@src/shared/modules/context/domain/criteria'

@injectable()
export class OwnerCreator {
  constructor (
    @inject(OwnerTypes.OwnerRepository)
    private readonly repository: OwnerRepository,
    @inject(SharedTypes.SharedRepository)
    private readonly shrdRepository: SharedRepository
  ) {}

  async run (owner: OwnerPrimitives): Promise<ApplicationResponse<OwnerPrimitives>> {
    try {
      const criteria = new Criteria({ ci: owner.ci })
      const isOwnerExist = await this.shrdRepository.match(criteria, 'owner')
      if (isOwnerExist.length > 0) {
        return {
          message: 'Este propietario ya se encuentra registrado',
          statusCode: 409,
          data: null
        }
      }

      const newOwner = Owner.create(
        new IdValueObject(uuid()),
        new CiValueObject(owner.ci),
        new NameValueObject(owner.name),
        new StringValueObject(owner.address)
      )
      await this.repository.save(newOwner)
      return {
        message: 'Propietario creado con exito!',
        statusCode: 200,
        data: newOwner.toPrimitives()
      }
    } catch (error) {
      console.log(error)
      return {
        message: 'No se ha podido crear el propietario',
        statusCode: 500,
        data: null
      }
    }
  }
}
