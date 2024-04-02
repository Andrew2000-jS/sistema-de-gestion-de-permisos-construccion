import { type Criteria } from '@src/shared/modules/context/domain/criteria'
import { type Permission } from './entities'
import { type Nullable } from '@src/shared/modules'

export interface PermissionRepository {
  save: (permission: Permission) => Promise<Permission>
  match: (criteria: Criteria) => Promise<Nullable<Permission[]>>
}
