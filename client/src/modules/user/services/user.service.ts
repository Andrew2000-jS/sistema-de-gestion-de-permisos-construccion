import { ApiResponse } from "@/lib";
import { User } from "../user.entity";
import axios, { AxiosError, AxiosResponse } from "axios";

export async function updateUser(
  id: string,
  data: Omit<User, "id" | "permission">
): Promise<ApiResponse<User>> {
  console.log(id, data)
  try {
    const response: AxiosResponse<ApiResponse<User>> = await axios.patch(
      `http://localhost:3001/user/update/${id}`,
      {
        data,
      }
    );
    return response.data;
  } catch (error: any) {
    return (error as AxiosError<ApiResponse<User>>).response!.data;
  }
}

export async function filterUser(
  filters: Partial<User>
): Promise<ApiResponse<User>> {
  try {
    const response: AxiosResponse<ApiResponse<User>> = await axios.post(
      `http://localhost:3001/user/filter`,
      { filters }
    );
    return response.data;
  } catch (error: any) {
    return (error as AxiosError<ApiResponse<User>>).response!.data;
  }
}
