import { type UserPrimitives, type UserWithoutId } from './user.entity'

export interface UserRepository {
  update: (id: string, user: UserWithoutId) => Promise<UserPrimitives>
  delete: (id: string) => Promise<void>
}
