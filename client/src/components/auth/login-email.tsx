"use client";

import { Button, Card, Input } from "@nextui-org/react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { messageAdapter, validationEmailDict, valuesAdapter } from "./utils";
import { emailAuth } from "./services";
import { useSubmit } from "./hook";
import AnimatedMessage from "../custome-elements/animated-message";

function LoginEmail() {
  const { formState, isVisible, onSubmit } = useSubmit<{
    email: string;
  }>({ callback: (data) => emailAuth(data), href: "/login/verify" });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const errorMessageEmail =
    messageAdapter(validationEmailDict)[errors.email?.type ?? ""];

  return (
    <Card className="p-5 w-full">
      <div>
        <div className="relative">
          <h2 className="text-lg font-bold">Inicio de Sesión</h2>
          <p className="text-sm py-3">
            Ingresa tu correo electronico para iniciar sesión.
          </p>
          {formState.response.statusCode === 200 && (
            <AnimatedMessage
              message={"Correo enviado!"}
              position={["absolute", "right-0", "top-0"]}
              color={"text-green-600"}
              isVisible={isVisible}
            />
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <Controller
              name="email"
              control={control}
              rules={{
                validate: valuesAdapter(validationEmailDict),
              }}
              render={({ field }) => (
                <Input
                  isRequired
                  type="email"
                  label="Email"
                  className="w-full"
                  variant="bordered"
                  color={errors.email ? "danger" : "default"}
                  {...field}
                />
              )}
            />
            {errorMessageEmail && (
              <p className="text-sm text-red-600">{errorMessageEmail}</p>
            )}
          </div>

          <div className="pt-3">
            <div>
              <Button
                color={
                  formState.response.statusCode === 200 ? "success" : "primary"
                }
                type="submit"
                className="w-full"
                isLoading={formState.response.loading}
                isDisabled={formState.response.statusCode === 200}
              >
                {formState.response.statusCode === 200
                  ? "Correo enviado"
                  : "Enviar"}
              </Button>
            </div>

            <p className="text-sm text-center py-5">
              O puedes iniciar sesión con:
            </p>

            <div>
              <Link href="/login">
                <Button color="default" className="w-full">
                  Iniciar sesión con contraseña
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}

export default LoginEmail;
