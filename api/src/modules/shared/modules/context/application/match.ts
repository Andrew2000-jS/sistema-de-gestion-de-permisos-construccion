import { inject, injectable } from 'inversify'
import { SharedRepository, TYPES, type ApplicationResponse } from '@src/shared/modules/context'
import { type TableType } from '@src/shared/modules/context/domain/shared.repository'
import { Criteria } from '@src/shared/modules/context/domain/criteria'

@injectable()
export class Matcher {
  constructor (@inject(TYPES.SharedRepository) private readonly repository: SharedRepository) {}

  async run (data: Criteria, type: TableType): Promise<ApplicationResponse<any[]>> {
    try {
      const filters = new Criteria(data.filters, data.orders, data.limit, data.offset)
      const foundData = await this.repository.match(filters, type)

      if (!foundData) {
        return { message: 'No se han encontrado coincidencias', statusCode: 404, data: [] }
      }

      return { message: 'Coincidencias encontradas', statusCode: 200, data: foundData }
    } catch (error) {
      console.log(error)
      return { message: 'Algo ha salido mal, intente mas tarde' as string, statusCode: 500, data: [] }
    }
  }
}
