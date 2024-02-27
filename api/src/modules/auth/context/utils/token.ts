import jwt from 'jsonwebtoken'

export function generateToken (payload: any, secretKey: string, expiresIn: string): string {
  return jwt.sign(payload, secretKey, { expiresIn })
}
