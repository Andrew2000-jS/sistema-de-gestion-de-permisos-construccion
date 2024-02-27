import jwt from 'jsonwebtoken'
import { type Request, type Response, type NextFunction } from 'express'

export const authorization = (req: Request, res: Response, next: NextFunction): any => {
  const authHeader = req.header('Authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado', statusCode: 401, data: null })
  }

  try {
    const payload = jwt.verify(authHeader, '3g8rgz4G7NH4')
    req.userInfo = payload
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido', statusCode: 401, data: null })
  }
}
