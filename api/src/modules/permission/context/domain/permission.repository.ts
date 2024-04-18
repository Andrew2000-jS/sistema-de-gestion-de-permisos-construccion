import { type Permission, type PermissionPrimitives } from './permission.entity'

export interface PermissionRepository {
  save: (permission: Permission) => Promise<void>
  update: (id: number, data: PermissionPrimitives) => Promise<void>
  delete: (id: number) => Promise<void>
}
