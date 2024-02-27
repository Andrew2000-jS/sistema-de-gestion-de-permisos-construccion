"use client";

import Link from "next/link";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/lib";
import { Card, Button, Input, Checkbox, Spacer } from "@nextui-org/react";
import { useState } from "react";

function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Card className="p-5 w-[30em]">
      <div>
        <h2 className="text-lg font-bold">Inicio de Sesion</h2>
        <p className="text-sm mt-3">
          Ingresa tu cédula y contraseña para iniciar sesión.
        </p>
      </div>
      <div className="flex flex-col justify-center">
        <div className="pt-4">
          <Input
            isRequired
            type="text"
            label="Cedula"
            className="w-full"
            variant="bordered"
            color="default"
          />
          <Spacer y={5} />
          <Input
            isRequired
            label="Contraseña"
            className="w-full"
            variant="bordered"
            color="default"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
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
          <Button color="primary">Inicia Sesión</Button>
        </div>
      </div>

      <div className="flex flex-col justify-center mt-8">
        <p className="text-center text-sm">O inicia sesión con</p>
        <Button variant="light" color="default">
          Email
        </Button>
      </div>
    </Card>
  );
}

export default Login;
