"use client";

import { Button, Card, Input } from "@nextui-org/react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { messageAdapter, validationEmailDict, valuesAdapter } from "../utils";
import { emailAuth } from "../services";
import { useSubmit } from "@/lib/common/hooks";
import { AnimatedMessage, AlertMessage } from "@/lib";
import Image from "next/image";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type DataType = {
  sessionCode: string;
};

function LoginEmail() {
  const router = useRouter();
  const [_, setCookie] = useCookies(["session-data"]);
  const { formState, isVisible, onSubmit } = useSubmit<{
    email: string;
  }>({
    callback: (data) => emailAuth(data),
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

  useEffect(() => {
    if (formState.response.statusCode === 200) {
      const data = formState.response.data as DataType;
      setCookie(
        "session-data",
        {
          sessionCode: data.sessionCode,
          ctx: "login_email",
        },
        { path: "/" }
      );
      router.push("/login/verify");
    }
  }, [
    formState.response.statusCode,
    formState.response.data,
    setCookie,
    router,
  ]);

  const errorMessageEmail =
    messageAdapter(validationEmailDict)[errors.email?.type ?? ""];

  return (
    <Card className="p-5 w-[25em]">
      <div>
        <div className="relative">
          <div className="flex flex-col justify-center items-center">
            <Image
              src={"/logo-alcaldia-2.png"}
              alt="logo alcaldia"
              height={250}
              width={250}
              className="mb-2"
            />
            <h2 className="text-lg font-bold">Inicio de Sesión</h2>
            <p className="text-sm py-3">
              Ingresa tu correo electronico para iniciar sesión.
            </p>
          </div>
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
                Enviar codigo
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
