"use client";

import { Button, Card, Input } from "@nextui-org/react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { verifyCode } from "./services";
import { useSubmit } from "./hook";
import AnimatedMessage from "../custome-elements/animated-message";
import Image from "next/image";
import AlertMessage from "../custome-elements/alert-message";

function VerifyCode() {
  const { formState, isVisible, onSubmit } = useSubmit<{
    code: string;
  }>({ callback: (data) => verifyCode(data), href: "/home" });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
    },
  });

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
            <h2 className="text-lg font-bold">Código de verificación</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-2">
          <div className="flex flex-col">
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <Input
                  isRequired
                  type="text"
                  placeholder="Ingrese el codigo de verificacion"
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
                Verificar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}

export default VerifyCode;
