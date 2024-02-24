import { PrismaClient } from '@prisma/client'
import { type Nullable } from '@src/shared/modules'
import { injectable } from 'inversify'
import { User, type UserWithoutId, type UserRepository } from '../domain'

@injectable()
export class MySQLUserRepository implements UserRepository {
  async delete (id: number): Promise<void> {
    try {
      const prisma = new PrismaClient()

      await prisma.user.delete({
        where: { id }
      })
    } catch (error) {
      console.log(error)
      throw new Error(error as string)
    }
  }

  async findById (id: number): Promise<Nullable<User>> {
    try {
      const prisma = new PrismaClient()
      const foundUser = await prisma.user.findFirst({
        where: { id }
      })

      const user = User.fromPrimitives(foundUser!)
      return user
    } catch (error) {
      console.log(error)
      throw new Error(error as string)
    }
  }

  async update (id: number, user: UserWithoutId): Promise<User> {
    try {
      const prisma = new PrismaClient()
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
    }
  }
}
