import { ApiResponse } from "@/lib/common/interfaces";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

interface IResponseState extends ApiResponse {
  loading: boolean;
}

interface Props<T> {
  callback: (data: T) => Promise<ApiResponse> | any;
}

function useSubmit<T extends FieldValues>({
  callback,
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
