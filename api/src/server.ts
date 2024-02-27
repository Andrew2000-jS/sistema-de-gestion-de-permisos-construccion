import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { InversifyExpressServer } from 'inversify-express-utils'
import container from './modules/auth/app/config/inversify'
import morgan from 'morgan'

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

const server = new InversifyExpressServer(container, null, { rootPath: '/' }, app)
export default server.build()
