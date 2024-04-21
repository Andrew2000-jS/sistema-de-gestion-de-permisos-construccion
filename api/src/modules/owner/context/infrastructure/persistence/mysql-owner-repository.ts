import { type OwnerPrimitives, type Owner, type OwnerRepository } from '@src/owner/context/domain'
import { PrismaSingleton } from '@src/shared/modules/context/infrastructure/orm'
import { injectable } from 'inversify'

@injectable()
export class MySQLOwnernRepository implements OwnerRepository {
  async save (owner: Owner): Promise<void> {
    const prisma = PrismaSingleton.getInstance()
    try {
      const ownerPrimitives = owner.toPrimitives()

      await prisma.owner.create({
        data: {
          address: ownerPrimitives.address,
          ci: ownerPrimitives.ci,
          name: ownerPrimitives.name
        }
      })
    } catch (error) {
      console.log(error)
      throw new Error((error as string))
    } finally {
      await prisma.$disconnect()
    }
  }

  async delete (id: number): Promise<void> {
    const prisma = PrismaSingleton.getInstance()
    try {
      await prisma.owner.delete({
        where: { id }
      })
    } catch (error) {
      console.log(error)
      throw new Error((error as string))
    } finally {
      await prisma.$disconnect()
    }
  }

  async update (id: number, data: OwnerPrimitives): Promise<void> {
    const prisma = PrismaSingleton.getInstance()

    try {
      await prisma.owner.update({
        where: { id },
        data: {
          address: data.address,
          ci: data.ci,
          name: data.name
        }
      })
    } catch (error) {
      console.log(error)
      throw new Error((error as string))
    } finally {
      await prisma.$disconnect()
    }
  }
}
