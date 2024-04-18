import { type Construction, type ConstructionPrimitives } from './construction.entity'

export interface ConstructioRepository {
  save: (construction: Construction) => Promise<void>
  update: (id: number, data: ConstructionPrimitives) => Promise<void>
  delete: (id: number) => Promise<void>
}
