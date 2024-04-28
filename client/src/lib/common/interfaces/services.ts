export interface ApiResponse<T> {
  message: string | null;
  statusCode: number | null;
  data: T | any;
  loading?: boolean
}
