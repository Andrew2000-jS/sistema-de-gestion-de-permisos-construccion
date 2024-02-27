import { type Nullable } from '@src/shared/modules'
import { type User, type UserPrimitives } from './auth.entity'

export interface AuthRepository {
  register: (user: User) => Promise<void>
  findById: (id: number) => Promise<Nullable<UserPrimitives>>
  findByCi: (ci: number) => Promise<Nullable<UserPrimitives>>
}
