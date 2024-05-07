/* eslint-disable @typescript-eslint/dot-notation */
import { type TableType, type SharedRepository, Exception } from '../../domain'
import { type Criteria } from '../../domain/criteria'
import { CriteriaPrismaConverter, PrismaSingleton } from '../orm'
import { injectable } from 'inversify'

@injectable()
export class MySQLSharedRepository implements SharedRepository {
  async match (criteria: Criteria, type: TableType): Promise<any[]> {
    const prisma = PrismaSingleton.getInstance()
    try {
      const prismaCriteria = CriteriaPrismaConverter.convert(criteria)
      if (type === 'permission') return await prisma.permission.findMany({ ...prismaCriteria, include: { construction: true, owner: true } })
      if (type === 'construction') return await prisma.construction.findMany({ ...prismaCriteria, include: { amount: true, area: true, Permission: true } })
      if (type === 'owner') return await prisma.owner.findMany({ ...prismaCriteria, include: { permission: true } })
      if (type === 'user') return await prisma.user.findMany(prismaCriteria)
      else throw new Exception('Invalid type', 'InvalidMatcherType')
    } catch (error) {
      console.log(error)
      throw new Error(error as string)
    } finally {
      await prisma.$disconnect()
    }
  }
}
