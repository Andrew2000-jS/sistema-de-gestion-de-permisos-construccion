import { injectable } from 'inversify'
import { type PermissionPrimitives, type Permission, type PermissionRepository } from '../../domain'
import { PrismaSingleton } from '@src/shared/modules/context/infrastructure/orm'

@injectable()
export class MySQLPermissionRepository implements PermissionRepository {
  async save (permission: Permission): Promise<void> {
    const prisma = PrismaSingleton.getInstance()
    try {
      const permissionPrimitives = permission.toPrimitives()

      await prisma.permission.create({
        data: {
          amount: permissionPrimitives.amount,
          civ: permissionPrimitives.CIV,
          date: permissionPrimitives.date,
          observation: permissionPrimitives.observation,
          quantity: permissionPrimitives.quantity,
          receiptNo: permissionPrimitives.receiptNo,
          status: permissionPrimitives.status,
          constructionId: permissionPrimitives.constructionId,
          ownerId: permissionPrimitives.ownerId
        },
        include: {
          construction: true,
          owner: true
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
      const permission = await prisma.permission.findUnique({
        where: { id }
      })

      await prisma.permission.delete({
        where: { id: permission?.id }
      })
    } catch (error) {
      console.log(error)
      throw new Error((error as string))
    } finally {
      await prisma.$disconnect()
    }
  }

  async update (id: number, data: PermissionPrimitives): Promise<void> {
    const prisma = PrismaSingleton.getInstance()

    try {
      await prisma.permission.update({
        where: { id },
        data: {
          amount: data.amount,
          civ: data.CIV,
          date: data.date,
          status: data.status,
          quantity: data.quantity,
          observation: data.observation,
          ownerId: data.ownerId,
          constructionId: data.constructionId
        },
        include: {
          owner: true,
          construction: true
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
