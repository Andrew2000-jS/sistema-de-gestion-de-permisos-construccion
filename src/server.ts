import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { InversifyExpressServer } from 'inversify-express-utils'
import container from './modules/auth/app/config/inversify'

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())

const server = new InversifyExpressServer(container, null, { rootPath: '/' }, app)
export default server.build()
