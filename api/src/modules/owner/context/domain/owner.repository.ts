import { type Owner, type OwnerPrimitives } from './owner.entity'

export interface OwnerRepository {
  save: (construction: Owner) => Promise<void>
  update: (id: string, data: OwnerPrimitives) => Promise<void>
  delete: (id: string) => Promise<void>
}
