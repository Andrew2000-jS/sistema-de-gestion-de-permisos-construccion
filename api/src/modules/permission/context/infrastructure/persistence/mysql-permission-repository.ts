// import { type Criteria } from '@src/shared/modules/context/domain/criteria'
import { injectable } from 'inversify'
import { type PermissionPrimitives, type PermissionRepository } from '../../domain'
// import { type Nullable } from '@src/shared/modules'
import { PrismaClient } from '@prisma/client'

@injectable()
export class MySQLPermissionRepository implements PermissionRepository {
  async save (permission: PermissionPrimitives): Promise<PermissionPrimitives> {
    const prisma = new PrismaClient()
    try {
      const amount = await prisma.amount.create({
        data: {
          landAmount: permission.construction.landAmount,
          workAmount: permission.construction.workAmount,
          tax: permission.construction.tax
        }
      })

      const area = await prisma.area.create({
        data: {
          constructionArea: permission.construction.constructionArea,
          landArea: permission.construction.landArea
        }
      })

      const construction = await prisma.construction.create({
        data: {
          address: permission.construction.address,
          type: permission.construction.type,
          company: permission.construction.constructionCompany,
          engineer: permission.construction.engineer,
          floorsNo: permission.construction.floorsNo,
          manager: permission.construction.manager,
          amountId: amount.id,
          areaId: area.id

        }
      })

      // Crear el propietario
      const owner = await prisma.owner.create({
        data: {
          ci: permission.owner.ci,
          name: permission.owner.name,
          address: permission.owner.address
        }
      })

      await prisma.permission.create({
        data: {
          amount: permission.amount,
          civ: permission.CIV,
          date: permission.date,
          observation: permission.observation,
          quantity: permission.quantity,
          receiptNo: permission.receiptNo,
          status: permission.status,
          constructionId: construction.id,
          ownerId: owner.id
        }
      })

      return permission
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
