import { StringValueObject, IdValueObject, EnumValueObject, PositiveNumberValueObject, NameValueObject } from '@src/shared/modules/context/domain/value-object'

export const enum ConstructionType {
  NEW = 'New',
  REMODELING = 'Remodeling',
  PERIMETER_FENCE = 'Perimeter Fence',
  EXPANSION = 'Expansion'
}

export class Construction {
  private readonly id: IdValueObject
  private readonly address: StringValueObject
  private readonly type: EnumValueObject<ConstructionType>
  private readonly constructionArea: StringValueObject
  private readonly landArea: StringValueObject
  private readonly destination: StringValueObject
  private readonly floorsNo: PositiveNumberValueObject
  private readonly manager: NameValueObject
  private readonly engineer: NameValueObject
  private readonly constructionCompany: StringValueObject
  private readonly landAmount: PositiveNumberValueObject
  private readonly workAmount: PositiveNumberValueObject
  private readonly tax: PositiveNumberValueObject

  constructor (
    id: IdValueObject,
    address: StringValueObject,
    type: EnumValueObject<ConstructionType>,
    constructionArea: StringValueObject,
    landArea: StringValueObject,
    destination: StringValueObject,
    floorsNo: PositiveNumberValueObject,
    manager: NameValueObject,
    engineer: NameValueObject,
    constructionCompany: StringValueObject,
    landAmount: PositiveNumberValueObject,
    workAmount: PositiveNumberValueObject,
    tax: PositiveNumberValueObject
  ) {
    this.id = id
    this.address = address
    this.type = type
    this.constructionArea = constructionArea
    this.landArea = landArea
    this.destination = destination
    this.floorsNo = floorsNo
    this.manager = manager
    this.engineer = engineer
    this.constructionCompany = constructionCompany
    this.landAmount = landAmount
    this.workAmount = workAmount
    this.tax = tax
  }

  toPrimitives (): ConstructionPrimitives {
    return {
      id: this.id.getValue(),
      address: this.address.getValue(),
      type: this.type.getValue(),
      constructionArea: this.constructionArea.getValue(),
      constructionCompany: this.constructionCompany.getValue(),
      destination: this.destination.getValue(),
      engineer: this.engineer.getValue(),
      floorsNo: this.floorsNo.getValue(),
      landAmount: this.landAmount.getValue(),
      landArea: this.landArea.getValue(),
      manager: this.manager.getValue(),
      tax: this.tax.getValue(),
      workAmount: this.workAmount.getValue()
    }
  }

  static fromPrimitives (plainData: {
    id: number
    address: string
    type: ConstructionType
    constructionArea: string
    landArea: string
    destination: string
    floorsNo: number
    manager: string
    engineer: string
    constructionCompany: string
    landAmount: number
    workAmount: number
    tax: number }): Construction {
    return new Construction(
      new IdValueObject(plainData.id),
      new StringValueObject(plainData.address),
      new EnumValueObject(plainData.type, [ConstructionType.NEW, ConstructionType.EXPANSION, ConstructionType.PERIMETER_FENCE, ConstructionType.REMODELING]),
      new StringValueObject(plainData.constructionArea),
      new StringValueObject(plainData.landArea),
      new StringValueObject(plainData.destination),
      new PositiveNumberValueObject(plainData.floorsNo),
      new NameValueObject(plainData.manager),
      new NameValueObject(plainData.engineer),
      new StringValueObject(plainData.constructionCompany),
      new PositiveNumberValueObject(plainData.landAmount),
      new PositiveNumberValueObject(plainData.workAmount),
      new PositiveNumberValueObject(plainData.tax)
    )
  }
}

export type ConstructionPrimitives = {
  id: number
  address: string
  type: ConstructionType
  constructionArea: string
  landArea: string
  destination: string
  floorsNo: number
  manager: string
  engineer: string
  constructionCompany: string
  landAmount: number
  workAmount: number
  tax: number
}
