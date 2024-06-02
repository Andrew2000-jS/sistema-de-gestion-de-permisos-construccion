import { ApiResponse } from "@/lib";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Owner } from "../owner.entity";

export async function createOwner({
  address,
  ci,
  name,
}: Omit<Owner, "id" | "permission">): Promise<ApiResponse<Owner>> {
  try {
    const response: AxiosResponse<ApiResponse<Owner>> = await axios.post(
      "http://localhost:3001/owner/create",
      {
        ci,
        address,
        name,
      }
    );
    return response.data;
  } catch (error: any) {
    return (error as AxiosError<ApiResponse<Owner>>).response!.data;
  }
}

export async function getOwners(): Promise<ApiResponse<Owner>> {
  try {
    const response: AxiosResponse<ApiResponse<Owner>> = await axios.get(
      "http://localhost:3001/owner/"
    );
    return response.data;
  } catch (error: any) {
    return (error as AxiosError<ApiResponse<Owner>>).response!.data;
  }
}

export async function updateOwner(
  id: string,
  data: Omit<Owner, "id" | "permission">
): Promise<ApiResponse<Owner>> {
  try {
    const response: AxiosResponse<ApiResponse<Owner>> = await axios.patch(
      `http://localhost:3001/owner/update/${id}`,
      {
        data,
      }
    );
    return response.data;
  } catch (error: any) {
    return (error as AxiosError<ApiResponse<Owner>>).response!.data;
  }
}

export async function deleteOwner(id: string): Promise<ApiResponse<Owner>> {
  try {
    const response: AxiosResponse<ApiResponse<Owner>> = await axios.delete(
      `http://localhost:3001/owner/delete/${id}`
    );
    return response.data;
  } catch (error: any) {
    return (error as AxiosError<ApiResponse<Owner>>).response!.data;
  }
}

export async function filterOwner(
  filters: Partial<Owner>
): Promise<ApiResponse<Owner>> {
  try {
    const response: AxiosResponse<ApiResponse<Owner>> = await axios.post(
      `http://localhost:3001/owner/filter`,
      { filters }
    );
    return response.data;
  } catch (error: any) {
    return (error as AxiosError<ApiResponse<Owner>>).response!.data;
  }
}
