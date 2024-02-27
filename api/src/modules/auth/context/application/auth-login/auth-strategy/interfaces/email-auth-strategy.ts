import { type AuthLoginStrategy } from './auth-login-strategy'

export interface EmailAuthStrategy extends AuthLoginStrategy {
  email: string
}
