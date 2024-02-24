export type ApplicationResponse<T> = {
  message: string
  statusCode: number
  data: T | null
}
