import { StringValueObject, IdValueObject, EnumValueObject, PositiveNumberValueObject } from '@src/shared/modules/context/domain/value-object'
import { Construction, type ConstructionPrimitives } from '@src/construction/context/domain'
import { Owner, type OwnerPrimitives } from '@src/owner/context/domain'

export const enum Status {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  CANCELED = 'Canceled',
}

export class Permission {
  private readonly id: IdValueObject
  private readonly date: Date
  private readonly quantity: PositiveNumberValueObject
  private readonly amount: PositiveNumberValueObject
  private readonly CIV: number
  private readonly observation: StringValueObject
  private readonly receiptNo: StringValueObject
  private readonly status: EnumValueObject<Status>
  private readonly construction: Construction
  private readonly owner: Owner

  constructor (
    id: IdValueObject,
    date: Date,
    quantity: PositiveNumberValueObject,
    amount: PositiveNumberValueObject,
    CIV: number,
    observation: StringValueObject,
    receiptNo: StringValueObject,
    construction: Construction,
    owner: Owner,
    status: EnumValueObject<Status>
  ) {
    this.id = id
    this.date = date
    this.quantity = quantity
    this.amount = amount
    this.CIV = CIV
    this.observation = observation
    this.receiptNo = receiptNo
    this.construction = construction
    this.owner = owner
    this.status = status
  }

  static create (
    id: IdValueObject,
    date: Date,
    quantity: PositiveNumberValueObject,
    amount: PositiveNumberValueObject,
    CIV: number,
    observation: StringValueObject,
    receiptNo: StringValueObject,
    construction: Construction,
    owner: Owner,
    status: EnumValueObject<Status>
  ): Permission {
    return new Permission(
      id,
      date,
      quantity,
      amount,
      CIV,
      observation,
      receiptNo,
      construction,
      owner,
      status
    )
  }

  toPrimitives (): PermissionPrimitives {
    return {
      id: this.id.getValue(),
      date: this.date,
      quantity: this.quantity.getValue(),
      amount: this.amount.getValue(),
      CIV: this.CIV,
      observation: this.observation.getValue(),
      receiptNo: this.receiptNo.getValue(),
      status: this.status.getValue(),
      construction: this.construction.toPrimitives(),
      owner: this.owner.toPrimitives()
    }
  }

  static fromPrimitives (plainData: { id: number
    date: Date
    quantity: number
    amount: number
    CIV: number
    observation: string
    receiptNo: string
    status: Status
    construction: ConstructionPrimitives
    owner: OwnerPrimitives }): Permission {
    return new Permission(
      new IdValueObject(plainData.id),
      plainData.date,
      new PositiveNumberValueObject(plainData.quantity),
      new PositiveNumberValueObject(plainData.amount),
      plainData.CIV,
      new StringValueObject(plainData.observation),
      new StringValueObject(plainData.receiptNo),
      Construction.fromPrimitives(plainData.construction),
      Owner.fromPrimitives(plainData.owner),
      new EnumValueObject(plainData.status, [Status.PENDING, Status.APPROVED, Status.CANCELED, Status.COMPLETED, Status.IN_PROGRESS, Status.REJECTED])
    )
  }
}

export type PermissionPrimitives = {
  id: number
  date: Date
  quantity: number
  amount: number
  CIV: number
  observation: string
  receiptNo: string
  status: Status
  construction: ConstructionPrimitives
  owner: OwnerPrimitives
}
