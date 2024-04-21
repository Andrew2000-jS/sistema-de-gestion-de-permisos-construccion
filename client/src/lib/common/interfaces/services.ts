export interface ApiResponse {
  message: string | null;
  statusCode: number | null;
  data: unknown;
}
