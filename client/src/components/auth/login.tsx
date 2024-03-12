"use client";

import { EyeFilledIcon, EyeSlashFilledIcon } from "@/lib";
import { Button, Card, Checkbox, Input, Spacer } from "@nextui-org/react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import {
  messageAdapter,
  validationCiDict,
  validationPasswordDict,
  valuesAdapter,
} from "./utils";
import { digestAuth } from "./services";
import AnimatedMessage from "../custome-elements/animated-message";
import { AuthResponse } from "@/lib/common/interfaces";
import { useSubmit } from "./hook";

interface IResponseState extends AuthResponse {
  loading: boolean;
}

function Login() {
  const { formState, isVisible, setFormState, onSubmit } = useSubmit<{
    ci: string;
    password: string;
  }>({ callback: (data) => digestAuth(data), href: "/home" });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ci: "",
      password: "",
    },
  });

  const errorMessageCi =
    messageAdapter(validationCiDict)[errors.ci?.type ?? ""];

  const errorMessagePassword = messageAdapter(validationPasswordDict)[
    errors.password?.type ?? ""
  ];

  return (
    <Card className="p-5 w-[30em]">
      <div className="relative">
        <h2 className="text-lg font-bold">Inicio de Sesion</h2>
        <p className="text-sm mt-3">
          Ingresa tu cédula y contraseña para iniciar sesión.
        </p>
      </div>
      {formState.response.message && (
        <AnimatedMessage
          position={["absolute", "right-5"]}
          message={formState.response.message}
          color={
            formState.response.statusCode !== 200
              ? "text-red-600"
              : "text-green-600"
          }
          isVisible={isVisible}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center">
          <div className="pt-4">
            <Controller
              name="ci"
              control={control}
              rules={{
                validate: valuesAdapter(validationCiDict),
              }}
              render={({ field }) => (
                <Input
                  isRequired
                  type="text"
                  label="Cedula"
                  className="w-full"
                  variant="bordered"
                  color={errors.ci ? "danger" : "default"}
                  {...field}
                />
              )}
            />
            {errorMessageCi && (
              <p className="text-sm text-red-600">{errorMessageCi}</p>
            )}
            <Spacer y={5} />
            <Controller
              name="password"
              control={control}
              rules={{
                validate: valuesAdapter(validationPasswordDict),
              }}
              render={({ field }) => (
                <Input
                  isRequired
                  label="Contraseña"
                  className="w-full"
                  variant="bordered"
                  color={errors.password ? "danger" : "default"}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() =>
                        setFormState((prevState) => ({
                          ...prevState,
                          showPassword: !prevState.showPassword,
                        }))
                      }
                    >
                      {formState.showPassword ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={formState.showPassword ? "text" : "password"}
                  {...field}
                />
              )}
            />
            {errorMessagePassword && (
              <p className="text-sm text-red-600">{errorMessagePassword}</p>
            )}
          </div>
          <div className="flex justify-between items-center mt-7">
            <Checkbox size="sm">Recuerdame</Checkbox>
            <p className="text-[.8em] font-bold text-blue-600 cursor-pointer">
              ¿Olvidaste tu contraseña?
            </p>
          </div>

          <div className="flex justify-around items-center mt-7">
            <Link href="/register">
              <Button color="default">Regístrate</Button>
            </Link>
            <Button
              color={
                formState.response.statusCode === 200 ? "primary" : "primary"
              }
              type="submit"
              isLoading={formState.response.loading}
              isDisabled={formState.response.statusCode === 200}
            >
              {formState.response.statusCode === 200
                ? "Bienvenido"
                : "Inicia Sesión"}
            </Button>
          </div>
        </div>

        <div className="flex flex-col justify-center mt-8">
          <p className="text-center text-sm">O inicia sesión con</p>
          <Link href="/login/email">
            <Button variant="light" color="default" className="w-full">
              Email
            </Button>
          </Link>
        </div>
      </form>
    </Card>
  );
}

export default Login;
