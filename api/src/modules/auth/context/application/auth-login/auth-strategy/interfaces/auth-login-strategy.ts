import { type UserPrimitives } from '@src/auth/context/domain'
import { type ApplicationResponse } from '@src/shared/modules'

export interface AuthLoginStrategy {
  execute: (user: UserPrimitives) => ApplicationResponse<any> | Promise<ApplicationResponse<any>>
}
