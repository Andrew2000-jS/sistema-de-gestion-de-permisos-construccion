import { ApiResponse } from "@/lib";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Permission } from "../permission.entity";

export async function createPermission({
  CIV,
  amount,
  date,
  observation,
  quantity,
  receiptNo,
  status,
  constructionId,
  ownerId,
}: Omit<Permission, "id">): Promise<ApiResponse> {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post(
      "http://localhost:3001/permissions/create",
      {
        CIV,
        amount,
        date,
        observation,
        quantity,
        receiptNo,
        status,
        constructionId,
        ownerId,
      }
    );
    return response.data;
  } catch (error: any) {
    return (error as AxiosError<ApiResponse>).response!.data;
  }
}

export async function filterPermissions(data: Partial<Permission>): Promise<ApiResponse> {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post(
      "http://localhost:3001/permissions/filter",
      {
       data
      }
    );
    return response.data;
  } catch (error: any) {
    return (error as AxiosError<ApiResponse>).response!.data;
  }
}
