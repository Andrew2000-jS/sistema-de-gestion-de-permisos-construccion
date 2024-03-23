"use client";

import { Button, Card, Input } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import AnimatedMessage from "../custome-elements/animated-message";
import Image from "next/image";
import AlertMessage from "../custome-elements/alert-message";
import { sendEmailToRecoverPassword } from "./services";
import { useSubmit } from "./hook";
import { saveToLocalStorage } from "@/lib/common/utils";

function ForgotPassword() {
  const { formState, isVisible, onSubmit } = useSubmit<{
    email: string;
  }>({
    callback: (data) => sendEmailToRecoverPassword(data),
    href: "/login/verify",
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  if (formState.response.statusCode === 200) {
    saveToLocalStorage("recovery_password", "code_ctx");
  }

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
