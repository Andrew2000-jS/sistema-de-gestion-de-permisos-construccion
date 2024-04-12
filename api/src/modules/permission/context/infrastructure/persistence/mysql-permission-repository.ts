// import { type Criteria } from '@src/shared/modules/context/domain/criteria'
import { injectable } from 'inversify'
import { type Permission, type PermissionRepository } from '../../domain'
// import { type Nullable } from '@src/shared/modules'
import { PrismaClient } from '@prisma/client'

@injectable()
export class MySQLPermissionRepository implements PermissionRepository {
  async save (permission: Permission): Promise<void> {
    const prisma = new PrismaClient()
    try {
      const permissionPrimitives = permission.toPrimitives()
      const amount = await prisma.amount.create({
        data: {
          landAmount: permissionPrimitives.construction.landAmount,
          workAmount: permissionPrimitives.construction.workAmount,
          tax: permissionPrimitives.construction.tax
        }
      })

      const area = await prisma.area.create({
        data: {
          constructionArea: permissionPrimitives.construction.constructionArea,
          landArea: permissionPrimitives.construction.landArea
        }
      })

      const construction = await prisma.construction.create({
        data: {
          address: permissionPrimitives.construction.address,
          type: permissionPrimitives.construction.type,
          company: permissionPrimitives.construction.constructionCompany,
          engineer: permissionPrimitives.construction.engineer,
          floorsNo: permissionPrimitives.construction.floorsNo,
          manager: permissionPrimitives.construction.manager,
          amountId: amount.id,
          areaId: area.id

        }
      })

      const owner = await prisma.owner.create({
        data: {
          ci: permissionPrimitives.owner.ci,
          name: permissionPrimitives.owner.name,
          address: permissionPrimitives.owner.address
        }
      })

      await prisma.permission.create({
        data: {
          amount: permissionPrimitives.amount,
          civ: permissionPrimitives.CIV,
          date: permissionPrimitives.date,
          observation: permissionPrimitives.observation,
          quantity: permissionPrimitives.quantity,
          receiptNo: permissionPrimitives.receiptNo,
          status: permissionPrimitives.status,
          constructionId: construction.id,
          ownerId: owner.id
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
    console.log(id)
  }

  // async update (id: number, data: Partial<PermissionPrimitives>): Promise<Permission> {

  // }

  // async match (criteria: Criteria): Promise<Nullable<Permission[]>> {

  // }
}
