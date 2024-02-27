import { PrismaClient } from '@prisma/client'
import { type Nullable } from '@src/shared/modules'
import { type User, type AuthRepository } from '../../domain'
import { injectable } from 'inversify'
import { type UserPrimitives } from '@src/user/context/domain'

@injectable()
export class MySQLAuthRepository implements AuthRepository {
  async register (user: User): Promise<void> {
    try {
      const userPrimitives = user.toPrimitives()

      const prisma = new PrismaClient()
      await prisma.user.create({
        data: {
          ci: userPrimitives.ci,
          name: userPrimitives.name,
          lastname: userPrimitives.lastname,
          email: userPrimitives.email,
          password: userPrimitives.password
        }
      })
    } catch (error) {
      console.log(error)
      throw new Error(error as string)
    }
  }

  async findByCi (ci: number): Promise<Nullable<UserPrimitives>> {
    try {
      const prisma = new PrismaClient()
      const foundUser = await prisma.user.findFirst({
        where: { ci }
      })

      if (!foundUser) {
        return null
      }

      return foundUser
    } catch (error) {
      console.log(error)
      throw new Error(error as string)
    }
  }

  async findById (id: number): Promise<Nullable<UserPrimitives>> {
    try {
      const prisma = new PrismaClient()
      const foundUser = await prisma.user.findFirst({
        where: { id }
      })

      if (!foundUser) {
        return null
      }

      return foundUser
    } catch (error) {
      console.log(error)
      throw new Error(error as string)
    }
  }
}
