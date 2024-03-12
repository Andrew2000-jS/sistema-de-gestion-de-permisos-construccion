import { type Nullable } from '@src/shared/modules'
import { type User, type UserPrimitives } from '../../../user/context/domain'
import { type Criteria } from '@src/shared/modules/context/domain/criteria'

export interface AuthRepository {
  register: (user: User) => Promise<void>
  match: (criteria: Criteria) => Promise<Nullable<UserPrimitives>>
}
