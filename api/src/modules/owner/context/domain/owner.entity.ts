import { StringValueObject, CiValueObject, IdValueObject, NameValueObject } from '@src/shared/modules/context/domain/value-object'

export class Owner {
  private readonly id: IdValueObject
  private readonly ci: CiValueObject
  private readonly name: NameValueObject
  private readonly address: StringValueObject

  constructor (id: IdValueObject, ci: CiValueObject, name: NameValueObject, address: StringValueObject) {
    this.id = id
    this.ci = ci
    this.name = name
    this.address = address
  }

  static create (id: IdValueObject, ci: CiValueObject, name: NameValueObject, address: StringValueObject): Owner {
    return new Owner(
      id,
      ci,
      name,
      address
    )
  }

  toPrimitives (): OwnerPrimitives {
    return {
      id: this.id.getValue(),
      ci: this.ci.getValue(),
      name: this.name.getValue(),
      address: this.address.getValue()
    }
  }

  static fromPrimitives (plainData: { id: number, ci: number, name: string, address: string }): Owner {
    return new Owner(
      new IdValueObject(plainData.id),
      new CiValueObject(plainData.ci),
      new NameValueObject(plainData.name),
      new StringValueObject(plainData.address)
    )
  }
}

export type OwnerPrimitives = {
  id: number
  ci: number
  name: string
  address: string
}
