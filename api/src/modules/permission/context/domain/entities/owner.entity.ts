import { type CustomeCi, type CustomeId, type CustomeName } from '@src/shared/modules/context/domain/value-object'

export class Owner {
  private readonly id: CustomeId
  private readonly ci: CustomeCi
  private readonly name: CustomeName
  private readonly address: string

  constructor (id: CustomeId, ci: CustomeCi, name: CustomeName, address: string) {
    this.id = id
    this.ci = ci
    this.name = name
    this.address = address
  }
}
