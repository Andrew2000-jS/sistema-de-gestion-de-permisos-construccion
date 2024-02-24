import { type Request } from 'express'

export type RequestType<T> = Request<any, any, T>
