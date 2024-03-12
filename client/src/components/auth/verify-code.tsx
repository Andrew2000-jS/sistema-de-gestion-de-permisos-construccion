"use client";

import { Button, Card, Input } from "@nextui-org/react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { verifyCode } from "./services";
import { useSubmit } from "./hook";
import AnimatedMessage from "../custome-elements/animated-message";

function VerifyCode() {
  const { formState, isVisible, onSubmit } = useSubmit<{
    code: string;
  }>({ callback: (data) => verifyCode(data) });
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
    <Card className="p-5 w-full">
      <div>
        <div>
          <h2 className="text-lg font-bold">Código de verificación</h2>
          <p className="text-sm py-3">Ingresa código de verificación.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <Input
                  isRequired
                  type="text"
                  className="w-full"
                  variant="bordered"
                  {...field}
                />
              )}
            />
            {formState.response.message && (
              <AnimatedMessage
                message={formState.response.message}
                position={["text-sm", "mt-2"]}
                color={
                  formState.response.statusCode !== 200
                    ? "text-red-600"
                    : "text-green-600"
                }
                isVisible={isVisible}
              />
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
                {formState.response.statusCode !== 200
                  ? "Verificado"
                  : "Verificar"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}

export default VerifyCode;
