import { type Nullable } from '@src/shared/modules'
import { type AuthRepository } from '../../domain'
import { type User, type UserPrimitives } from '../../../../user/context/domain'
import { injectable } from 'inversify'
import { type Criteria } from '@src/shared/modules/context/domain/criteria'
import { CriteriaPrismaConverter, PrismaSingleton } from '@src/shared/modules/context/infrastructure/orm'

@injectable()
export class MySQLAuthRepository implements AuthRepository {
  async register (user: User): Promise<void> {
    try {
      const userPrimitives = user.toPrimitives()

      const prisma = PrismaSingleton.getInstance()
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

  async match (criteria: Criteria): Promise<Nullable<UserPrimitives>> {
    try {
      const prisma = PrismaSingleton.getInstance()
      const prismaCriteria = CriteriaPrismaConverter.convert(criteria)
      const foundUser = await prisma.user.findFirst(prismaCriteria)

      if (!foundUser) {
        return null
      }

      return foundUser
    } catch (error) {
      console.log(error)
      throw new Error(error as string)
    }
  }

  async recover (email: string, password: string): Promise<Nullable<UserPrimitives>> {
    try {
      const prisma = PrismaSingleton.getInstance()
      const foundUser = await prisma.user.update({
        where: { email },
        data: { password }
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
