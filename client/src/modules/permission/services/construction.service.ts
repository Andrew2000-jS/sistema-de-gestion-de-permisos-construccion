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
  workAmount
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
        workAmount
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error)
    return (error as AxiosError<ApiResponse<Construction>>).response!.data;
  }
}
