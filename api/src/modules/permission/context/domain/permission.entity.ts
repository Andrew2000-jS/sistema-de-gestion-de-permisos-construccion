import { StringValueObject, IdValueObject, EnumValueObject, PositiveNumberValueObject } from '@src/shared/modules/context/domain/value-object'
import { PermissionIdValueObject } from './permission-id-value-object'

export const enum Status {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  CANCELED = 'Canceled',
}

export class Permission {
  private readonly id: PermissionIdValueObject
  private readonly date: Date
  private readonly quantity: PositiveNumberValueObject
  private readonly amount: PositiveNumberValueObject
  private readonly CIV: StringValueObject
  private readonly observation: StringValueObject
  private readonly receiptNo: StringValueObject
  private readonly status: EnumValueObject<Status>
  private readonly constructionId: IdValueObject
  private readonly ownerId: IdValueObject

  constructor (
    id: PermissionIdValueObject,
    date: Date,
    quantity: PositiveNumberValueObject,
    amount: PositiveNumberValueObject,
    CIV: StringValueObject,
    observation: StringValueObject,
    receiptNo: StringValueObject,
    constructionId: IdValueObject,
    ownerId: IdValueObject,
    status: EnumValueObject<Status>
  ) {
    this.id = id
    this.date = date
    this.quantity = quantity
    this.amount = amount
    this.CIV = CIV
    this.observation = observation
    this.receiptNo = receiptNo
    this.constructionId = constructionId
    this.ownerId = ownerId
    this.status = status
  }

  static create (
    id: PermissionIdValueObject,
    date: Date,
    quantity: PositiveNumberValueObject,
    amount: PositiveNumberValueObject,
    CIV: StringValueObject,
    observation: StringValueObject,
    receiptNo: StringValueObject,
    constructionId: IdValueObject,
    ownerId: IdValueObject,
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
      constructionId,
      ownerId,
      status
    )
  }

  toPrimitives (): PermissionPrimitives {
    return {
      id: this.id.getValue(),
      date: this.date,
      quantity: this.quantity.getValue(),
      amount: this.amount.getValue(),
      CIV: this.CIV.getValue(),
      observation: this.observation.getValue(),
      receiptNo: this.receiptNo.getValue(),
      status: this.status.getValue(),
      constructionId: this.constructionId.getValue(),
      ownerId: this.ownerId.getValue()
    }
  }

  static fromPrimitives (plainData: { id: number
    date: Date
    quantity: number
    amount: number
    CIV: string
    observation: string
    receiptNo: string
    status: Status
    constructionId: string
    ownerId: string }): Permission {
    return new Permission(
      new PermissionIdValueObject(plainData.id),
      plainData.date,
      new PositiveNumberValueObject(plainData.quantity),
      new PositiveNumberValueObject(plainData.amount),
      new StringValueObject(plainData.CIV),
      new StringValueObject(plainData.observation),
      new StringValueObject(plainData.receiptNo),
      new IdValueObject(plainData.constructionId),
      new IdValueObject(plainData.ownerId),
      new EnumValueObject(plainData.status, [Status.PENDING, Status.APPROVED, Status.CANCELED, Status.COMPLETED, Status.IN_PROGRESS, Status.REJECTED])
    )
  }
}

export type PermissionPrimitives = {
  id: number
  date: Date
  quantity: number
  amount: number
  CIV: string
  observation: string
  receiptNo: string
  status: Status
  constructionId: string
  ownerId: string
}
