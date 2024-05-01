import { ApiResponse } from "@/lib";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Permission } from "../permission.entity";

export async function getPermissions(): Promise<ApiResponse<Permission>> {
  try {
    const response: AxiosResponse<ApiResponse<Permission>> = await axios.get(
      "http://localhost:3001/permissions"
    );
    return response.data;
  } catch (error: any) {
    return (error as AxiosError<ApiResponse<Permission>>).response!.data;
  }
}

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
}: Omit<Permission, "id">): Promise<ApiResponse<Permission>> {
  try {
    const response: AxiosResponse<ApiResponse<Permission>> = await axios.post(
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
    return (error as AxiosError<ApiResponse<Permission>>).response!.data;
  }
}

export async function filterPermissions(
  filters: Partial<Permission>
): Promise<ApiResponse<Permission>> {
  try {
    const response: AxiosResponse<ApiResponse<Permission>> = await axios.post(
      "http://localhost:3001/permissions/filter",
      {
        filters,
      }
    );
    return response.data;
  } catch (error: any) {
    return (error as AxiosError<ApiResponse<Permission>>).response!.data;
  }
}

export async function deletePermissions(
  id: number
): Promise<ApiResponse<Permission>> {
  try {
    const response: AxiosResponse<ApiResponse<Permission>> = await axios.delete(
      `http://localhost:3001/permissions/delete/${id}`
    );
    return response.data;
  } catch (error: any) {
    return (error as AxiosError<ApiResponse<Permission>>).response!.data;
  }
}
