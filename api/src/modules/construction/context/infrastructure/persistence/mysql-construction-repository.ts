import { type ConstructionPrimitives, type Construction, type ConstructioRepository } from '@src/construction/context/domain'
import { PrismaSingleton } from '@src/shared/modules/context/infrastructure/orm'
import { injectable } from 'inversify'

@injectable()
export class MySQLConstructionRepository implements ConstructioRepository {
  async save (construction: Construction): Promise<void> {
    const prisma = PrismaSingleton.getInstance()

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
          id: constructionPrimitives.id,
          address: constructionPrimitives.address,
          type: constructionPrimitives.type,
          company: constructionPrimitives.constructionCompany,
          engineer: constructionPrimitives.engineer,
          floorsNo: constructionPrimitives.floorsNo,
          manager: constructionPrimitives.manager,
          amountId: amount.id,
          areaId: area.id,
          destination: constructionPrimitives.destination,
          population: constructionPrimitives.population,
          sanitaryPermit: constructionPrimitives.sanitaryPermit
        }
      })
    } catch (error) {
      console.log(error)
      throw new Error((error as string))
    } finally {
      await prisma.$disconnect()
    }
  }

  async delete (id: string): Promise<void> {
    const prisma = PrismaSingleton.getInstance()
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

  async update (id: string, data: ConstructionPrimitives): Promise<void> {
    const prisma = PrismaSingleton.getInstance()

    try {
      await prisma.construction.update({
        where: { id },
        data: {
          address: data.address,
          type: data.type,
          company: data.constructionCompany,
          engineer: data.engineer,
          floorsNo: data.floorsNo,
          manager: data.manager,
          destination: data.destination,
          population: data.population,
          sanitaryPermit: data.sanitaryPermit,
          amount: {
            update: {
              tax: data.tax,
              landAmount: data.landAmount,
              workAmount: data.workAmount
            }
          },
          area: {
            update: {
              constructionArea: data.constructionArea,
              landArea: data.landAmount
            }
          }
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
