import { injectable } from 'inversify'
import { PrismaClient } from '@prisma/client'
import { type PermissionPrimitives, type Permission, type PermissionRepository } from '../../domain'

@injectable()
export class MySQLPermissionRepository implements PermissionRepository {
  async save (permission: Permission): Promise<void> {
    const prisma = new PrismaClient()
    try {
      const permissionPrimitives = permission.toPrimitives()

      // const owner = await prisma.owner.create({
      //   data: {
      //     ci: permissionPrimitives.owner.ci,
      //     name: permissionPrimitives.owner.name,
      //     address: permissionPrimitives.owner.address
      //   }
      // })

      await prisma.permission.create({
        data: {
          amount: permissionPrimitives.amount,
          civ: permissionPrimitives.CIV,
          date: permissionPrimitives.date,
          observation: permissionPrimitives.observation,
          quantity: permissionPrimitives.quantity,
          receiptNo: permissionPrimitives.receiptNo,
          status: permissionPrimitives.status,
          constructionId: permissionPrimitives.construction.id,
          ownerId: permissionPrimitives.owner.id
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
    const prisma = new PrismaClient()
    try {
      const permission = await prisma.permission.findUnique({
        where: { id }
      })

      await prisma.permission.delete({
        where: { id: permission?.id }
      })

      await prisma.owner.delete({
        where: { id: permission?.ownerId }
      })

      await prisma.construction.delete({
        where: { id: permission?.constructionId }
      })
    } catch (error) {
      console.log(error)
      throw new Error((error as string))
    } finally {
      await prisma.$disconnect()
    }
  }

  async update (id: number, data: PermissionPrimitives): Promise<void> {
    const prisma = new PrismaClient()

    try {
      await prisma.permission.update({
        where: { id },
        data: {
          amount: data.amount,
          civ: data.CIV,
          date: data.date,
          status: data.status,
          quantity: data.quantity,
          observation: data.observation
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
