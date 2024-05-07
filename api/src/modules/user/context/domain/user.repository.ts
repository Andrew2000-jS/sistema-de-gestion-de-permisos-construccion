import { type Nullable } from '@src/shared/modules'
import { type User, type UserWithoutId } from './user.entity'

export interface UserRepository {
  update: (id: string, user: UserWithoutId) => Promise<User>
  delete: (id: string) => Promise<void>
  findById: (id: string) => Promise<Nullable<User>>
}
