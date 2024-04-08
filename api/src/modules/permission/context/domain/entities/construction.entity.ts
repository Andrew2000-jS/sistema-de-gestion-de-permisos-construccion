import { type CustomeId } from '@src/shared/modules/context/domain/value-object'

export class Construction {
  private readonly id: CustomeId
  private readonly address: string
  private readonly type: string
  private readonly constructionArea: string
  private readonly landArea: string
  private readonly destination: string
  private readonly floorsNo: number
  private readonly manager: string
  private readonly engineer: string
  private readonly constructionCompany: string
  private readonly landAmount: number
  private readonly workAmount: number
  private readonly tax: number

  constructor (
    id: CustomeId,
    address: string,
    type: string,
    constructionArea: string,
    landArea: string,
    destination: string,
    floorsNo: number,
    manager: string,
    engineer: string,
    constructionCompany: string,
    landAmount: number,
    workAmount: number,
    tax: number
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
}

export type ConstructionPrimitives = {
  id: number
  address: string
  type: string
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
