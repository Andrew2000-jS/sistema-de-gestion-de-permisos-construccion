"use client";

import Link from "next/link";
import { EyeFilledIcon, EyeSlashFilledIcon, nameRegex } from "@/lib";
import { Card, Button, Input, Spacer } from "@nextui-org/react";
import { validateCi, validatePassword, validateEmail } from "../utils";
import { useForm, Controller } from "react-hook-form";
import { useSubmit } from "@/lib/common/hooks";
import { AnimatedMessage, AlertMessage } from "@/lib";
import { register } from "../services";
import { useRouter } from "next/navigation";

interface IFormInput {
  ci: string;
  password: string;
  email: string;
  name: string;
  lastname: string;
  validatePassword: string;
}

function Register() {
  const router = useRouter();
  const { formState, setFormState, onSubmit } = useSubmit<IFormInput>({
    callback: async (data) => {
      const response = await register(data);
      if (response.statusCode === 201) router.push("/login");
      return response;
    },
  });

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ci: "",
      password: "",
      email: "",
      name: "",
      lastname: "",
      validatePassword: "",
    },
  });

  const validatePasswordConfirmation = (value: string) =>
    value === watch("password") || "Las contraseñas no coinciden";

  return (
    <Card className="p-5 w-[30em] h-full">
      <div>
        <h2 className="text-lg font-bold">Registro</h2>
        <p className="text-sm mt-3">Bienvenido.</p>
      </div>
      {formState.response.message && (
        <AnimatedMessage
          position={["absolute", "top-2", "right-0"]}
          isVisible={formState.isVisible}
        >
          <AlertMessage
            description={formState.response.message}
            styles={
              formState.response.statusCode !== 201
                ? ["text-red-800", "bg-red-50"]
                : ["text-green-800", "bg-green-50"]
            }
          />
        </AnimatedMessage>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center">
          <Spacer y={7} />
          <div>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  isRequired
                  type="email"
                  label="Email"
                  className="w-full"
                  variant="bordered"
                  validate={validateEmail}
                  {...field}
                />
              )}
            />
          </div>
          <Spacer y={7} />
          <div className="flex justify-between">
            <div className="flex flex-col w-full">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    isRequired
                    type="text"
                    label="Nombre"
                    className="w-full"
                    variant="bordered"
                    validate={nameRegex}
                    {...field}
                  />
                )}
              />
            </div>

            <Spacer x={2} />
            <div className="flex flex-col w-full">
              <Controller
                name="lastname"
                control={control}
                render={({ field }) => (
                  <Input
                    isRequired
                    type="text"
                    label="Apellido"
                    className="w-full"
                    variant="bordered"
                    validate={nameRegex}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <Spacer y={7} />
          <div>
            <Controller
              name="ci"
              control={control}
              render={({ field }) => (
                <Input
                  isRequired
                  type="text"
                  label="Cedula"
                  className="w-full"
                  variant="bordered"
                  validate={validateCi}
                  {...field}
                />
              )}
            />
          </div>
          <Spacer y={7} />
          <div className="flex justify-between">
            <div className="flex flex-col">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    isRequired
                    label="Contraseña"
                    className="w-full"
                    variant="bordered"
                    validate={validatePassword}
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
            </div>
            <Spacer y={7} />

            <div className="flex flex-col">
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
          <Spacer y={7} />

          <div className="flex justify-around">
            <Button
              color="primary"
              isLoading={formState.isLoading}
              isDisabled={formState.response.statusCode === 201}
              type="submit"
            >
              Registrate
            </Button>
            <Link href="/">
              <Button>¿Ya tienes cuenta?</Button>
            </Link>
          </div>
        </div>
      </form>
    </Card>
  );
}

export default Register;
