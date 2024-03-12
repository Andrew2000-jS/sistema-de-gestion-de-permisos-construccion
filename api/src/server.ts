import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { InversifyExpressServer } from 'inversify-express-utils'
import container from './modules/auth/app/config/inversify'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(helmet())
app.use(morgan('dev'))
app.use(cookieParser())

const server = new InversifyExpressServer(container, null, { rootPath: '/' }, app)
export default server.build()
