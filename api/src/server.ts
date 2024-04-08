import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { InversifyExpressServer } from 'inversify-express-utils'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import container from './config/inversify'

const app = express()

app.use(cookieParser())
app.use(express.json())

app.use(helmet())
app.use(cors())
app.use(morgan('dev'))

const server = new InversifyExpressServer(container, null, { rootPath: '/' }, app)
export default server.build()
