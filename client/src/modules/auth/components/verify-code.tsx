"use client";

import { Button, Card, Input } from "@nextui-org/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { AnimatedMessage, AlertMessage } from "@/lib";
import Image from "next/image";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { generateToken } from "../utils";

function VerifyCode() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(0);
  const [cookies, setCookies] = useCookies(["session-data"]);
  const router = useRouter();

  let sessionCode = null;
  let ctx = null;
  let email = null;

  if (cookies["session-data"]) {
    sessionCode = cookies["session-data"].sessionCode;
    ctx = cookies["session-data"].ctx;
    email = cookies["session-data"].email;
  }

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
  const url = ctx === "login_email" ? "/home" : "/login/reset-password";
  const onSubmit: SubmitHandler<{ code: string | null; ctx: string | null }> = (
    data
  ) => {
    setIsVisible(true);
    if (data.code !== sessionCode) {
      setMessage("Codigo incorrecto");
      setStatus(400);
    } else {
      setStatus(200);
      setMessage("Seras redirigido");
      ctx === "login_email"
        ? setCookies(
            "session-data",
            {
              token: generateToken({ email }),
            },
            { path: "/" }
          )
        : setCookies("session-data", {
            access: true,
            email,
          });
      router.push(url);
    }

    setTimeout(() => setIsVisible(false), 4000);
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
            {isVisible && (
              <AnimatedMessage
                position={["absolute", "top-2", "right-0"]}
                isVisible={true}
              >
                <AlertMessage
                  description={message}
                  styles={
                    status === 200
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
                isDisabled={status === 200}
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
