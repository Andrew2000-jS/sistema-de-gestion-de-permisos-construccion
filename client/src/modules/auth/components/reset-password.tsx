"use client";

import { Button, Card, Input, Spacer } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/lib";
import Image from "next/image";
import { AnimatedMessage, AlertMessage } from "@/lib";
import { useSubmit } from "@/lib/common/hooks";
import {
  messageAdapter,
  validationPasswordDict,
  valuesAdapter,
} from "../utils";
import { resetPassword } from "../services";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function ResetPassword() {
  const router = useRouter();
  const [cookies] = useCookies(["session-data"]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (cookies["session-data"].email) {
      setUserEmail(cookies["session-data"].email);
    }
  }, [cookies]);

  const { formState, setFormState, onSubmit } = useSubmit<{
    password: string;
    validatePassword: string;
    email: string;
  }>({
    callback: (data) =>
      resetPassword({
        validatePassword: data.validatePassword,
        password: data.password,
        email: userEmail,
      }),
  });

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      validatePassword: "",
      email: userEmail,
    },
  });

  useEffect(() => {
    if (formState.response.statusCode === 200) {
      router.push("/login");
    }
  }, [router, formState]);

  const validatePasswordConfirmation = (value: string) =>
    value === watch("password") || "Las contraseñas no coinciden";

  const errorMessagePassword = messageAdapter(validationPasswordDict)[
    errors.password?.type ?? ""
  ];

  return (
    <Card className="p-5 w-[30em] h-full">
      <div className="flex flex-col justify-center items-center">
        <Image
          src={"/logo-alcaldia-2.png"}
          alt="logo alcaldia"
          height={250}
          width={250}
          className="mb-2"
        />
        <h2 className="text-lg font-bold">Recuperar contraseña</h2>
        <p className="text-sm mt-3">Ingrese su nueva contraseña.</p>
      </div>
      {formState.response.message && (
        <AnimatedMessage
          position={["absolute", "top-2", "right-0"]}
          isVisible={formState.isVisible}
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center">
          <Spacer y={7} />
          <div className="flex justify-between">
            <div className="flex flex-col justify-center items-center w-full">
              <div className="flex flex-col w-full">
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
              <Spacer y={7} />

              <div className="flex flex-col w-full">
                <Controller
                  name="validatePassword"
                  control={control}
                  rules={{
                    validate: validatePasswordConfirmation,
                  }}
                  render={({ field }) => (
                    <Input
                      type="password"
                      isRequired
                      label="Comprobar contraseña"
                      className="w-full"
                      variant="bordered"
                      color={errors.validatePassword ? "danger" : "default"}
                      {...field}
                    />
                  )}
                />
                {errors.validatePassword && (
                  <p className="text-sm text-red-600">
                    {errors.validatePassword.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <Spacer y={7} />

          <div className="flex justify-around">
            <Button
              color={
                formState.response.statusCode === 200 ? "success" : "primary"
              }
              isLoading={formState.isLoading}
              isDisabled={formState.response.statusCode === 200}
              type="submit"
            >
              Actualizar contraseña
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}

export default ResetPassword;
