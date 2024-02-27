"use client";

import Link from "next/link";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/lib";
import { Card, Button, Input, Spacer } from "@nextui-org/react";
import { useState } from "react";

function Register() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Card className="p-5 w-full">
      <div>
        <h2 className="text-lg font-bold">Registro</h2>
        <p className="text-sm mt-3">Bienvenido.</p>
      </div>
      <div className="flex flex-col justify-center">
        <Spacer y={7} />
        <div>
          <Input
            isRequired
            type="email"
            label="Email"
            className="w-full"
            variant="bordered"
            color="default"
          />
        </div>
        <Spacer y={7} />
        <div className="flex justify-between">
          <Input
            isRequired
            type="text"
            label="Nombre"
            className="w-full"
            variant="bordered"
            color="default"
          />
          <Spacer x={2} />
          <Input
            isRequired
            type="text"
            label="Apellido"
            className="w-full"
            variant="bordered"
            color="default"
          />
        </div>
        <Spacer y={7} />
        <div>
          <Input
            isRequired
            type="email"
            label="Cedula"
            className="w-full"
            variant="bordered"
            color="default"
          />
        </div>
        <Spacer y={7} />
        <div className="flex justify-between">
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
          <Input
            isRequired
            label="Comprobar Contraseña"
            className="w-full"
            variant="bordered"
            color="default"
            type="password"
          />
        </div>
        <Spacer y={7} />

        <div className="flex justify-around">
          <Button color="primary">Registrate</Button>
          <Link href="/">
            <Button>¿Ya tienes cuenta?</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default Register;
