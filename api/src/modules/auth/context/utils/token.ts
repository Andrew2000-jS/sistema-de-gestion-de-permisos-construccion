import jwt from 'jsonwebtoken'

export function generateToken (payload: any, secretKey: string, expiresIn: string): string {
  const token = jwt.sign(payload, secretKey, { expiresIn })
  return token
}
