import { ApiResponse } from "@/lib/common/interfaces";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Auth } from "../auth.entity";

export async function digestAuth({
  ci,
  password,
}: Pick<Auth, "ci" | "password">): Promise<ApiResponse<Auth>> {
  try {
    const response: AxiosResponse<ApiResponse<Auth>> = await axios.post(
      "http://localhost:3001/auth/login",
      {
        ci: Number(ci),
        password,
        ctx: "digest",
      }
    );
    return response.data;
  } catch (error: any) {
    return (error as AxiosError<ApiResponse<Auth>>).response!.data;
  }
}

export async function emailAuth({
  email,
}: Pick<Auth, "email">): Promise<ApiResponse<Auth>> {
  try {
    const response: AxiosResponse<ApiResponse<Auth>> = await axios.post(
      "http://localhost:3001/auth/login",
      {
        email,
        ctx: "email",
      }
    );
    return response.data;
  } catch (error: any) {
    return (error as AxiosError<ApiResponse<Auth>>).response!.data;
  }
}

export async function register({
  ci,
  email,
  lastname,
  name,
  password,
}: Auth) {
  try {
    const response: AxiosResponse<ApiResponse<Auth>> = await axios.post(
      "http://localhost:3001/auth/register",
      {
        ci: Number(ci),
        email,
        lastname,
        name,
        password,
      }
    );
    return response.data;
  } catch (error) {
    return (error as AxiosError<ApiResponse<Auth>>).response!.data;
  }
}

export async function sendEmailToRecoverPassword({ email }: { email: string }) {
  try {
    const response: AxiosResponse<{sessionCode: string, statusCode: number, message: string}> = await axios.post(
      "http://localhost:3001/auth/login/send-email",
      {
        email,
      }
    );
    return response.data;
  } catch (error) {
    return (error as AxiosError<{sessionCode: string, statusCode: number, message: string}>).response!.data;
  }
}

export async function resetPassword({
  password,
  validatePassword,
  email,
}: {
  password: string;
  validatePassword: string;
  email: string;
}) {
  try {
    const response: AxiosResponse<ApiResponse<Auth>> = await axios.patch(
      "http://localhost:3001/auth/login/reset-password",
      {
        password,
        confirmPassword: validatePassword,
        email
      }
    );
    return response.data;
  } catch (error) {
    return (error as AxiosError<ApiResponse<Auth>>).response!.data;
  }
}
