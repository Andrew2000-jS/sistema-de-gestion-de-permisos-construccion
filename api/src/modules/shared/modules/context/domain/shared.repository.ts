import { type Criteria } from './criteria'

export type TableType = 'permission' | 'construction' | 'owner' | 'user'

export interface SharedRepository {
  match: (criteria: Criteria, type: TableType) => Promise<any[]>
}
