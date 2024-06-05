import { ApiResponse } from "@/lib/common/interfaces";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

interface Props<T> {
  callback: (data: T) => Promise<ApiResponse<T>> | any;
}

function useSubmit<T extends FieldValues>({
  callback,
}: Props<T>) {
  const [formState, setFormState] = useState<{
    response: ApiResponse<T>;
    showPassword: boolean;
    errors: {};
    isVisible: boolean;
    isLoading: boolean;
  }>({
    response: { message: null, statusCode: null, data: null},
    showPassword: false,
    errors: {},
    isVisible: false,
    isLoading: false
  });
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<T> = async (data) => {
    setFormState((prevState) => ({
      ...prevState,
      response: { message: null, statusCode: null, data: null },
      isLoading: true,
      isVisible: true
    }));
    try {
      setLoading(false)
      const res = await callback(data);
      setFormState((prevState) => ({
        ...prevState,
        response: {
          message: res?.message,
          statusCode: res?.statusCode,
          data: res?.data,
        },
        isLoading: false,
      }));

    } catch (error) {
      setFormState((prevState) => ({
        ...prevState,
        response: {
          message: (error as Record<string, string>).message ?? null,
          statusCode: (error as Record<string, number>).statusCode ?? null,
          data: (error as Record<string, number>).data ?? null,
        },
        isLoading: false
      }));
    } finally {
      setTimeout(() => setFormState((prevState) => ({ ...prevState, isVisible: false })), 3000);
    }
  };

  return { formState, isVisible, setFormState, loading, onSubmit };
}

export default useSubmit;
