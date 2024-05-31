"use client";

import { Button, Card, Input } from "@nextui-org/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { AnimatedMessage, AlertMessage } from "@/lib";
import Image from "next/image";
import { useCookies } from "react-cookie";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { generateToken } from "../utils";

function VerifyCode() {
  const [state, setState] = useState({
    isVisible: false,
    message: "",
    status: 0,
  });
  const [cookies, setCookies] = useCookies(["session-data"]);
  const router = useRouter();

  const { sessionCode, ctx, email } = useMemo(() => {
    if (cookies["session-data"]) {
      return {
        sessionCode: cookies["session-data"].sessionCode,
        ctx: cookies["session-data"].ctx,
        email: cookies["session-data"].email,
      };
    }
    return { sessionCode: null, ctx: null, email: null };
  }, [cookies]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
      ctx,
    },
  });
  const url = ctx === "login_email" ? "/permissions" : "/login/reset-password";
  const onSubmit: SubmitHandler<{ code: string | null; ctx: string | null }> = (
    data
  ) => {
    setState((prevState) => ({ ...prevState, isVisible: true }));

    if (data.code !== sessionCode) {
      setState({ isVisible: true, message: "Codigo incorrecto", status: 400 });
    } else {
      const newCookies =
        ctx === "login_email"
          ? { token: generateToken({ email }) }
          : { access: true, email };

      setCookies("session-data", newCookies, { path: "/" });
      setState({ isVisible: true, message: "Seras redirigido", status: 200 });
      router.push(url);
    }

    setTimeout(
      () => setState((prevState) => ({ ...prevState, isVisible: false })),
      4000
    );
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
            {state.isVisible && (
              <AnimatedMessage
                position={["absolute", "top-2", "right-0"]}
                isVisible={true}
              >
                <AlertMessage
                  description={state.message}
                  styles={
                    state.status === 200
                      ? ["text-green-800", "bg-green-50"]
                      : ["text-red-800", "bg-red-50"]
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
                isDisabled={state.status === 200}
              >
                Verificar codigo
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}

export default VerifyCode;
