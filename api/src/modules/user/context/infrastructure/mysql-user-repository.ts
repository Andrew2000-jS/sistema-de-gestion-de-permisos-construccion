import { PrismaClient } from '@prisma/client'
import { type Nullable } from '@src/shared/modules'
import { injectable } from 'inversify'
import { User, type UserWithoutId, type UserRepository } from '../domain'

@injectable()
export class MySQLUserRepository implements UserRepository {
  async delete (id: string): Promise<void> {
    const prisma = new PrismaClient()
    try {
      await prisma.user.delete({
        where: { id }
      })
    } catch (error) {
      console.log(error)
      throw new Error(error as string)
    } finally {
      await prisma.$disconnect()
    }
  }

  async findById (id: string): Promise<Nullable<User>> {
    const prisma = new PrismaClient()
    try {
      const foundUser = await prisma.user.findFirst({
        where: { id }
      })

      const user = User.fromPrimitives(foundUser!)
      return user
    } catch (error) {
      console.log(error)
      throw new Error(error as string)
    } finally {
      await prisma.$disconnect()
    }
  }

  async update (id: string, user: UserWithoutId): Promise<User> {
    const prisma = new PrismaClient()
    try {
      const updatedUser = await prisma.user.update({
        where: {
          id
        },
        data: {
          ci: user.ci,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          password: user.password
        }
      })

      return User.fromPrimitives(updatedUser)
    } catch (error) {
      console.log(error)
      throw new Error(error as string)
    } finally {
      await prisma.$disconnect()
    }
  }
}
