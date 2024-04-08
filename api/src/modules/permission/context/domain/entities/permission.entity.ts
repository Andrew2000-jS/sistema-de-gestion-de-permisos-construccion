import { type CustomeId } from '@src/shared/modules/context/domain/value-object'
import { type ConstructionPrimitives, type Construction } from './construction.entity'
import { type OwnerPrimitives, type Owner } from './owner.entity'

export class Permission {
  private readonly id: CustomeId
  private readonly date: Date
  private readonly quantity: number
  private readonly amount: number
  private readonly CIV: number
  private readonly observation: string
  private readonly receiptNo: string
  private readonly status: string
  private readonly construction: Construction
  private readonly owner: Owner

  constructor (
    id: CustomeId,
    date: Date,
    quantity: number,
    amount: number,
    CIV: number,
    observation: string,
    receiptNo: string,
    construction: Construction,
    owner: Owner,
    status: string
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
    id: CustomeId,
    date: Date,
    quantity: number,
    amount: number,
    CIV: number,
    observation: string,
    receiptNo: string,
    construction: Construction,
    owner: Owner,
    status: string
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
}

export type PermissionPrimitives = {
  id: number
  date: Date
  quantity: number
  amount: number
  CIV: number
  observation: string
  receiptNo: string
  status: string
  construction: ConstructionPrimitives
  owner: OwnerPrimitives
}
