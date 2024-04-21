import { PrismaClient } from '@prisma/client'
import { type ConstructionPrimitives, type Construction, type ConstructioRepository } from '@src/construction/context/domain'
import { injectable } from 'inversify'

@injectable()
export class MySQLConstructionRepository implements ConstructioRepository {
  async save (construction: Construction): Promise<void> {
    const prisma = new PrismaClient()

    try {
      const constructionPrimitives = construction.toPrimitives()
      const amount = await prisma.amount.create({
        data: {
          landAmount: constructionPrimitives.landAmount,
          workAmount: constructionPrimitives.workAmount,
          tax: constructionPrimitives.tax
        }
      })

      const area = await prisma.area.create({
        data: {
          constructionArea: constructionPrimitives.constructionArea,
          landArea: constructionPrimitives.landArea
        }
      })

      await prisma.construction.create({
        data: {
          address: constructionPrimitives.address,
          type: constructionPrimitives.type,
          company: constructionPrimitives.constructionCompany,
          engineer: constructionPrimitives.engineer,
          floorsNo: constructionPrimitives.floorsNo,
          manager: constructionPrimitives.manager,
          amountId: amount.id,
          areaId: area.id
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
      await prisma.construction.delete({
        where: { id }
      })
    } catch (error) {
      console.log(error)
      throw new Error((error as string))
    } finally {
      await prisma.$disconnect()
    }
  }

  async update (id: number, data: ConstructionPrimitives): Promise<void> {
    const prisma = new PrismaClient()

    try {
      await prisma.construction.update({
        where: { id },
        data: {
          address: data.address,
          type: data.type,
          company: data.constructionCompany,
          engineer: data.engineer,
          floorsNo: data.floorsNo,
          manager: data.manager
        },
        include: {
          amount: true,
          area: true
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
