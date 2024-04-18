import { Matcher, RequestType } from '@src/shared/modules'
import { type Criteria } from '@src/shared/modules/context/domain/criteria'
import { Request, Response } from 'express'
import { inject } from 'inversify'
import {
  controller,
  httpDelete,
  httpPatch,
  httpPost
} from 'inversify-express-utils'
import { ConstructionCreator, ConstructionDeleter, ConstructionUpdater } from '../context/application'
import { type ConstructionPrimitives } from '../context/domain'

@controller('/constructions')
export class ConstructionController {
  constructor (
    @inject(ConstructionCreator)
    private readonly constructionCreator: ConstructionCreator,
    @inject(ConstructionDeleter)
    private readonly constructionDeleter: ConstructionDeleter,
    @inject(ConstructionUpdater)
    private readonly constructionUpdater: ConstructionUpdater,
    @inject(Matcher)
    private readonly constructionMatcher: Matcher
  ) {}

  @httpPost('/create')
  async createConstruction (
    req: RequestType<ConstructionPrimitives>,
    res: Response
  ): Promise<any> {
    const response = await this.constructionCreator.run(req.body)
    return res.status(response.statusCode).json(response)
  }

  @httpDelete('/delete/:id')
  async deleteConstruction (
    req: Request,
    res: Response
  ): Promise<any> {
    const { id } = req.params
    const response = await this.constructionDeleter.run({ id: Number(id) })
    return res.status(response.statusCode).json(response)
  }

  @httpPatch('/update/:id')
  async updateConstruction (
    req: RequestType<{ data: ConstructionPrimitives }>,
    res: Response
  ): Promise<any> {
    const { id } = req.params
    const { data } = req.body
    const response = await this.constructionUpdater.run({ id: Number(id), data })
    return res.status(response.statusCode).json(response)
  }

  @httpPost('/filter')
  async matchConstruction (
    req: RequestType<Criteria>,
    res: Response
  ): Promise<any> {
    const response = await this.constructionMatcher.run(req.body, 'construction')
    return res.status(response.statusCode).json(response)
  }
}
