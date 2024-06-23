import { injectable } from 'inversify'
import { type UserWithoutId, type UserRepository, type UserPrimitives } from '../domain'
import { PrismaSingleton } from '@src/shared/modules/context/infrastructure/orm'

@injectable()
export class MySQLUserRepository implements UserRepository {
  async delete (id: string): Promise<void> {
    const prisma = PrismaSingleton.getInstance()
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

  async update (id: string, user: UserWithoutId): Promise<UserPrimitives> {
    const prisma = PrismaSingleton.getInstance()

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

      return updatedUser
    } catch (error) {
      console.log(error)
      throw new Error(error as string)
    } finally {
      await prisma.$disconnect()
    }
  }
}
