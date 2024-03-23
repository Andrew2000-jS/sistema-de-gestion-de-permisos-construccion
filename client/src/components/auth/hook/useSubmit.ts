import { AuthResponse } from "@/lib/common/interfaces";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { saveToLocalStorage } from "@/lib/common/utils";

interface IResponseState extends AuthResponse {
  loading: boolean;
}

interface Props<T> {
  callback: (data: T) => Promise<AuthResponse>;
  href?: string;
}

function useSubmit<T extends FieldValues>({
  callback,
  href,
}: Props<T>) {
  const [formState, setFormState] = useState<{
    response: IResponseState;
    showPassword: boolean;
    errors: {};
  }>({
    response: { message: null, statusCode: null, data: null, loading: false },
    showPassword: false,
    errors: {},
  });
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit: SubmitHandler<T> = async (data) => {
    setFormState((prevState) => ({
      ...prevState,
      response: { message: null, statusCode: null, data: null, loading: true },
    }));
    try {
      const res = await callback(data);
      setFormState((prevState) => ({
        ...prevState,
        response: {
          message: res.message,
          statusCode: res.statusCode,
          data: res.data,
          loading: false,
        },
      }));
      setIsVisible(true);

      if (res.statusCode?.toString().startsWith("2")) href && router.push(href);
    } catch (error) {
      setFormState((prevState) => ({
        ...prevState,
        response: {
          message: (error as Record<string, string>).message ?? null,
          statusCode: (error as Record<string, number>).statusCode ?? null,
          data: (error as Record<string, number>).data ?? null,
          loading: false,
        },
      }));
      setIsVisible(true);
    } finally {
      setTimeout(() => setIsVisible(false), 4000);
    }
  };
  return { formState, isVisible, setFormState, onSubmit };
}

export default useSubmit;
