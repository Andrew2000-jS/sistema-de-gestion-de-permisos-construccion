import { type AuthLoginStrategy } from './auth-login-strategy'

export interface DigestAuthStrategy extends AuthLoginStrategy {
  password: string
}
