import { type Owner, type OwnerPrimitives } from './owner.entity'

export interface OwnerRepository {
  save: (construction: Owner) => Promise<void>
  update: (id: number, data: OwnerPrimitives) => Promise<void>
  delete: (id: number) => Promise<void>
}
