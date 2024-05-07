import { ApiResponse } from "@/lib";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Owner } from "../entities/owner.entity";

export async function createOwner({
  address,
  ci,
  name,
}: Omit<Owner, "id">): Promise<ApiResponse<Owner>> {
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
