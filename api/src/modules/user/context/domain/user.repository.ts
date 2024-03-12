import { type Nullable } from '@src/shared/modules'
import { type User, type UserWithoutId } from './user.entity'

export interface UserRepository {
  update: (id: number, user: UserWithoutId) => Promise<User>
  delete: (id: number) => Promise<void>
  findById: (id: number) => Promise<Nullable<User>>
}
