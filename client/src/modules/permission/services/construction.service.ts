import { ApiResponse } from "@/lib";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Construction } from "../entities/construction.entity";

export async function createConstruction({
  address,
  constructionArea,
  constructionCompany,
  destination,
  engineer,
  floorsNo,
  landAmount,
  landArea,
  manager,
  population,
  sanitaryPermit,
  tax,
  type,
  workAmount,
}: Omit<Construction, "id">): Promise<ApiResponse<Construction>> {
  try {
    const response: AxiosResponse<ApiResponse<Construction>> = await axios.post(
      "http://localhost:3001/constructions/create",
      {
        address,
        constructionArea,
        constructionCompany,
        destination,
        engineer,
        floorsNo,
        landAmount,
        landArea,
        manager,
        population,
        sanitaryPermit,
        tax,
        type,
        workAmount,
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    return (error as AxiosError<ApiResponse<Construction>>).response!.data;
  }
}

export async function updateConstruction(
  id: string,
  updatedData: Omit<Construction, "id">
): Promise<ApiResponse<Construction>> {
  try {
    const response: AxiosResponse<ApiResponse<Construction>> =
      await axios.patch(`http://localhost:3001/constructions/update/${id}`, {
        data: updatedData,
      });
    return response.data;
  } catch (error: any) {
    console.log(error);
    return (error as AxiosError<ApiResponse<Construction>>).response!.data;
  }
}

export async function deleteConstruction(id: string): Promise<ApiResponse<Construction>> {
  try {
    const response: AxiosResponse<ApiResponse<Construction>> = await axios.delete(
      `http://localhost:3001/constructions/delete/${id}`
    );
    return response.data;
  } catch (error: any) {
    return (error as AxiosError<ApiResponse<Construction>>).response!.data;
  }
}