"use client";

import { Button, Card, Input } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import { AnimatedMessage, AlertMessage } from "@/lib";
import { sendEmailToRecoverPassword } from "../services";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

function ForgotPassword() {
  const router = useRouter();
  const [state, setState] = useState({
    isVisible: false,
    loading: false,
    message: "",
    statusCode: 0,
    isDisabled: false,
  });
  const [, setCookies] = useCookies(["session-data"]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    setState((prevState) => ({
      ...prevState,
      isVisible: true,
      isDisabled: true,
      loading: true,
    }));
    try {
      const response = await sendEmailToRecoverPassword({ email: data.email });
      setState((prevState) => ({
        ...prevState,
        statusCode: response.statusCode,
        message: response.message,
        loading: false,
      }));
      setCookies("session-data", {
        sessionCode: response.sessionCode,
        ctx: "recovery_password",
        email: data.email,
      });
      router.push("/login/verify");
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        statusCode: 500,
        message: "Algo ha salido mal",
        loading: false,
      }));
      console.log(error);
    } finally {
      setTimeout(() => {
        setState((prevState) => ({ ...prevState, isVisible: false }));
      }, 4000);
    }
  };

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
            {state.message && (
              <AnimatedMessage
                position={["absolute", "top-2", "right-0"]}
                isVisible={state.isVisible}
              >
                <AlertMessage
                  description={state.message}
                  styles={
                    state.statusCode !== 200
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
                isLoading={state.loading}
                isDisabled={state.isDisabled}
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
