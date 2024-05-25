import { v4 as uuid } from 'uuid'
import { Construction, type ConstructionPrimitives, ConstructioRepository, ConstructionType } from '@src/construction/context/domain'
import { TYPES } from '@src/construction/context/utils'
import { type ApplicationResponse } from '@src/shared/modules'
import { EnumValueObject, IdValueObject, NameValueObject, PositiveNumberValueObject, StringValueObject } from '@src/shared/modules/context/domain/value-object'
import { inject, injectable } from 'inversify'

@injectable()
export class ConstructionCreator {
  constructor (@inject(TYPES.ConstructioRepository) private readonly repository: ConstructioRepository) {}

  async run (construction: ConstructionPrimitives): Promise<ApplicationResponse<ConstructionPrimitives>> {
    try {
      const newConstruction = Construction.create(
        new IdValueObject(uuid()),
        new StringValueObject(construction.address),
        new EnumValueObject(construction.type, [ConstructionType.NEW, ConstructionType.EXPANSION, ConstructionType.PERIMETER_FENCE, ConstructionType.REMODELING]),
        new PositiveNumberValueObject(construction.constructionArea),
        new PositiveNumberValueObject(construction.landArea),
        new StringValueObject(construction.destination),
        new PositiveNumberValueObject(construction.floorsNo),
        new NameValueObject(construction.manager),
        new NameValueObject(construction.engineer),
        new StringValueObject(construction.constructionCompany),
        new PositiveNumberValueObject(construction.landAmount),
        new PositiveNumberValueObject(construction.workAmount),
        new PositiveNumberValueObject(construction.tax),
        new PositiveNumberValueObject(construction.population),
        new StringValueObject(construction.sanitaryPermit)
      )

      await this.repository.save(newConstruction)
      return { message: 'Construccion creada con exito!', statusCode: 200, data: newConstruction.toPrimitives() }
    } catch (error) {
      console.log(error)
      return { message: 'No se ha podido crear la construnccion', statusCode: 500, data: null }
    }
  }
}
