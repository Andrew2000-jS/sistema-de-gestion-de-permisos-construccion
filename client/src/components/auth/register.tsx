"use client";

import Link from "next/link";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/lib";
import { Card, Button, Input, Spacer } from "@nextui-org/react";
import {
  messageAdapter,
  validationCiDict,
  validationEmailDict,
  validationLastNameDict,
  validationNameDict,
  validationPasswordDict,
  valuesAdapter,
} from "./utils";
import { useForm, Controller } from "react-hook-form";
import { useSubmit } from "./hook";
import AnimatedMessage from "../custome-elements/animated-message";
import { register } from "./services";
import AlertMessage from "../custome-elements/alert-message";

interface IFormInput {
  ci: string;
  password: string;
  email: string;
  name: string;
  lastname: string;
  validatePassword: string;
}

function Register() {
  const { formState, isVisible, setFormState, onSubmit } =
    useSubmit<IFormInput>({
      callback: (data) => register(data),
      href: "/login",
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

  const errorMessageCi =
    messageAdapter(validationCiDict)[errors.ci?.type ?? ""];

  const errorMessagePassword = messageAdapter(validationPasswordDict)[
    errors.password?.type ?? ""
  ];

  const errorMessageEmail =
    messageAdapter(validationEmailDict)[errors.email?.type ?? ""];

  const errorMessageName =
    messageAdapter(validationNameDict)[errors.name?.type ?? ""];

  const errorMessageLastName = messageAdapter(validationLastNameDict)[
    errors.lastname?.type ?? ""
  ];

  return (
    <Card className="p-5 w-[30em] h-full">
      <div>
        <h2 className="text-lg font-bold">Registro</h2>
        <p className="text-sm mt-3">Bienvenido.</p>
      </div>
      {formState.response.message && (
        <AnimatedMessage
          position={["absolute", "top-2", "right-0"]}
          isVisible={isVisible}
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
          <Spacer y={7} />
          <div className="flex justify-between">
            <div className="flex flex-col w-full">
              <Controller
                name="name"
                control={control}
                rules={{
                  validate: valuesAdapter(validationLastNameDict),
                }}
                render={({ field }) => (
                  <Input
                    isRequired
                    type="text"
                    label="Nombre"
                    className="w-full"
                    variant="bordered"
                    color={errors.name ? "danger" : "default"}
                    {...field}
                  />
                )}
              />
              {errorMessageName && (
                <p className="text-sm text-red-600">{errorMessageName}</p>
              )}
            </div>

            <Spacer x={2} />
            <div className="flex flex-col w-full">
              <Controller
                name="lastname"
                control={control}
                rules={{
                  validate: valuesAdapter(validationLastNameDict),
                }}
                render={({ field }) => (
                  <Input
                    isRequired
                    type="text"
                    label="Apellido"
                    className="w-full"
                    variant="bordered"
                    color={errors.lastname ? "danger" : "default"}
                    {...field}
                  />
                )}
              />
              {errorMessageLastName && (
                <p className="text-sm text-red-600">{errorMessageLastName}</p>
              )}
            </div>
          </div>
          <Spacer y={7} />
          <div>
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
          </div>
          <Spacer y={7} />
          <div className="flex justify-between">
            <div className="flex flex-col">
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
              color={
                formState.response.statusCode === 201 ? "success" : "primary"
              }
              isLoading={formState.response.loading}
              isDisabled={formState.response.statusCode === 201}
              type="submit"
            >
              {formState.response.statusCode === 201!
                ? "Registro exitoso!"
                : "Registrate"}
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
