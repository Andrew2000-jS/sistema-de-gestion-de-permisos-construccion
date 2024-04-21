import { inject, injectable } from 'inversify'
import { Criteria } from '../../domain/criteria'
import { type ApplicationResponse, TYPES, sendGmail } from '../../utils'
import { SharedRepository, type TableType } from '../../domain'

export interface IEmailNotification {
  email: string
  subject: string
  html: string
  type: TableType
  data?: any
}

@injectable()
export class EmailNotification {
  constructor (@inject(TYPES.SharedRepository) private readonly repository: SharedRepository) {}

  async run ({ email, html, subject, type, data }: IEmailNotification): Promise<ApplicationResponse<any>> {
    try {
      const criteria = new Criteria({ email })
      const foundData = await this.repository.match(criteria, type)

      if (!foundData) {
        return {
          message: 'Correo no encontrado',
          statusCode: 404,
          data: null
        }
      }

      const auth = {
        user: 'alcaldiacarirubanabot@gmail.com',
        pass: 'snza gbhs aval rovd'
      }

      await sendGmail({ to: email, html, subject, auth, from: 'alcaldiacarirubanabot@gmail.com' })

      return {
        message: 'Verifique su correo electronico',
        statusCode: 200,
        data
      }
    } catch (error) {
      console.log(error)
      return {
        message: 'No se ha podido enviar el correo electronico' as string,
        statusCode: 500,
        data: null
      }
    }
  }
}
