// import { type Criteria } from '@src/shared/modules/context/domain/criteria'
import { type PermissionPrimitives } from './entities'
// import { type Nullable } from '@src/shared/modules'

export interface PermissionRepository {
  save: (permission: PermissionPrimitives) => Promise<PermissionPrimitives>
  // update: (id: number, data: Partial<PermissionPrimitives>) => Promise<Permission>
  // delete: (id: number) => Promise<void>
  // match: (criteria: Criteria) => Promise<Nullable<Permission[]>>
}
