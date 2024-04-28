"use client";

import { Button, Card, Input } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import { AnimatedMessage, AlertMessage } from "@/lib";
import { sendEmailToRecoverPassword } from "../services";
import { useSubmit } from "@/lib/common/hooks";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

type DataType = {
  sessionCode: string;
};

function ForgotPassword() {
  const router = useRouter();
  const [_, setCookie] = useCookies(["session-data"]);

  const { formState, isVisible, onSubmit } = useSubmit<{
    email: string;
  }>({
    callback: (data) => sendEmailToRecoverPassword(data),
  });
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (formState.response.statusCode === 200) {
      const data = formState.response.data as DataType;
      setCookie("session-data", {
        sessionCode: data.sessionCode,
        ctx: "recovery_password",
        email: getValues("email"),
      });
      router.push("/login/verify");
    }
  }, [
    formState.response.statusCode,
    formState.response.data,
    setCookie,
    router,
    getValues,
  ]);

  return (
    <Card className="p-5 w-[25em]">
      <div>
        <div className="flex flex-col justify-center items-center">
          <Image
            src={"/logo-alcaldia-2.png"}
            alt="logo alcaldia"
            height={250}
            width={250}
            className="mb-2"
          />
          <div className="py-3">
            <h2 className="text-lg font-bold">Recuperacion de clave</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-2">
          <div className="flex flex-col">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  isRequired
                  type="email"
                  placeholder="Ingrese su correo electronico"
                  className="w-full"
                  variant="bordered"
                  {...field}
                />
              )}
            />
            {formState.response.message && (
              <AnimatedMessage
                position={["absolute", "top-2", "right-0"]}
                isVisible={isVisible}
              >
                <AlertMessage
                  description={formState.response.message}
                  styles={
                    formState.response.statusCode !== 200
                      ? ["text-red-800", "bg-red-50"]
                      : ["text-green-800", "bg-green-50"]
                  }
                />
              </AnimatedMessage>
            )}
          </div>
          <div className="pt-3">
            <div>
              <Button
                color="primary"
                type="submit"
                className="w-full"
                isLoading={formState.response.loading}
                isDisabled={formState.response.statusCode === 200}
              >
                Enviar codigo
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}

export default ForgotPassword;
