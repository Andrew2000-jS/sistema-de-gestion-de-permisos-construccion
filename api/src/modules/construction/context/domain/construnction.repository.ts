import { type Construction, type ConstructionPrimitives } from './construction.entity'

export interface ConstructioRepository {
  save: (construction: Construction) => Promise<void>
  update: (id: string, data: ConstructionPrimitives) => Promise<void>
  delete: (id: string) => Promise<void>
}
