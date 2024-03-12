import { inject, injectable } from 'inversify'
import { TYPES } from '../../utils'
import { AuthRepository } from '../../domain'
import { Criteria, type IOrder } from '@src/shared/modules/context/domain/criteria'

@injectable()
export class SearchUser {
  constructor (
    @inject(TYPES.AuthRepository)
    private readonly repository: AuthRepository
  ) {}

  async run (
    filters: Record<string, any>,
    orderBy?: string[],
    orderType?: string,
    pageSize?: number,
    pageNumber?: number
  ): Promise<any> {
    const orders: IOrder[] =
      orderBy && orderType
        ? orderBy.map((field) => ({
          field,
          direction: orderType.toLowerCase() as 'ASC' | 'DESC'
        }))
        : []

    const criteria = new Criteria(filters, orders, pageSize, pageNumber)

    return await this.repository.match(criteria)
  }
}
