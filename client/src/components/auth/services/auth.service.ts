import { AuthResponse } from "@/lib/common/interfaces";
import axios, { AxiosError, AxiosResponse } from "axios";

interface AuthProps {
  ci: string;
  password: string;
  email: string;
  name: string;
  lastname: string;
  validatePassword: string;
}

axios.defaults.withCredentials = true;

export async function digestAuth({
  ci,
  password,
}: Pick<AuthProps, "ci" | "password">): Promise<AuthResponse> {
  try {
    const response: AxiosResponse<AuthResponse> = await axios.post(
      "http://localhost:3001/auth/login",
      {
        ci: Number(ci),
        password,
        ctx: "digest",
      }
    );
    return response.data;
  } catch (error: any) {
    return (error as AxiosError<AuthResponse>).response!.data;
  }
}

export async function emailAuth({
  email,
}: Pick<AuthProps, "email">): Promise<AuthResponse> {
  try {
    const response: AxiosResponse<AuthResponse> = await axios.post(
      "http://localhost:3001/auth/login",
      {
        email,
        ctx: "email",
      }
    );
    return response.data;
  } catch (error: any) {
    return (error as AxiosError<AuthResponse>).response!.data;
  }
}

export async function register({
  ci,
  email,
  lastname,
  name,
  password,
}: AuthProps) {
  try {
    const response: AxiosResponse<AuthResponse> = await axios.post(
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
    return (error as AxiosError<AuthResponse>).response!.data;
  }
}

export async function verifyCode({ code }: { code: string }) {
  try {
    const response: AxiosResponse<AuthResponse> = await axios.post(
      "http://localhost:3001/auth/login/code",
      {
        code,
      }
    );
    return response.data;
  } catch (error) {
    return (error as AxiosError<AuthResponse>).response!.data;
  }
}
