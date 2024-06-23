"use client";

import {
  AlertMessage,
  AnimatedMessage,
  decodeToken,
  nameRegex,
  statusTypeAdapter,
  useRequest,
  useSubmit,
  validateEmail,
} from "@/lib";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Listbox,
  ListboxItem,
  Spinner,
} from "@nextui-org/react";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Controller, useForm } from "react-hook-form";
import { filterUser, updateUser } from "../../services";
import { User } from "../../user.entity";

function Configuration() {
  const [id, setId] = useState<string>();
  const [cookie] = useCookies(["session-data"]);

  useEffect(() => {
    if (cookie["session-data"]) {
      const decodedToken = decodeToken(cookie["session-data"].token);
      if (decodedToken) {
        setId(decodedToken.userId);
      }
    }
  }, [cookie]);

  const { requestData } = useRequest<User>(filterUser, {
    id,
  });

  const { control, handleSubmit } = useForm({
    defaultValues: requestData.data[0],
  });

  const { formState, onSubmit } = useSubmit({
    callback: async (userData: Omit<User, "id" | "permission">) => {
      return await updateUser(initialValues.id, {
        ...userData,
        ci: Number(userData.ci),
      });
    },
  });

  console.log(formState);
  const initialValues: User = requestData.data[0];

  return (
    <Card shadow="sm" className="w-[30em] h-[450px]">
      {requestData.loading ? (
        <div className="h-full w-full flex flex-col items-center justify-center">
          <Spinner size="md" />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <h1>Configuracion</h1>
          </CardHeader>
          <AnimatedMessage
            position={["absolute", "top-2", "right-0"]}
            isVisible={formState.isVisible}
          >
            <AlertMessage
              description={formState.response.message as string}
              styles={
                formState.response.statusCode !== 200
                  ? ["text-red-800", "bg-red-50"]
                  : ["text-green-800", "bg-green-50"]
              }
            />
          </AnimatedMessage>
          <CardBody className="max-h-[350px] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="name"
                control={control}
                defaultValue={initialValues.name}
                render={({ field }) => (
                  <Input
                    description="Nombre del usuario"
                    type="text"
                    validate={nameRegex}
                    {...field}
                  />
                )}
              />
              <Controller
                name="lastname"
                control={control}
                defaultValue={initialValues.lastname}
                render={({ field }) => (
                  <Input
                    description="Apellido del usuario"
                    type="text"
                    validate={nameRegex}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="col-span-2 pb-5">
              <Controller
                name="ci"
                control={control}
                defaultValue={initialValues.ci}
                render={({ field }) => (
                  <Input
                    minLength={8}
                    maxLength={8}
                    validate={(value: string) =>
                      Number(value) < 0
                        ? "El campo contiene caracteres invalidos"
                        : null
                    }
                    description="Cedula del usuario"
                    type="number"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="col-span-2 pb-5">
              <Controller
                name="email"
                control={control}
                defaultValue={initialValues.email}
                render={({ field }) => (
                  <Input
                    validate={validateEmail}
                    description="Email del usuario"
                    type="email"
                    {...field}
                  />
                )}
              />
            </div>
            <div>
              <h3 className="py-5">Permisos de construccion</h3>
              <Listbox>
                {initialValues?.permission?.map((permission) => (
                  <ListboxItem key={permission.id} showDivider variant="light">
                    <div>
                      <Link
                        href={`/permissions/${permission.id}`}
                        className="flex items-center justify-between"
                      >
                        <span className="font-semibold pr-5">
                          {permission.receiptNo}
                        </span>
                        <span>{format(permission.date, "yyyy-MM-dd")}</span>
                        <span className="pr-2">
                          {statusTypeAdapter(permission.status).translatedType}
                        </span>
                      </Link>
                    </div>
                  </ListboxItem>
                ))}
              </Listbox>
            </div>
          </CardBody>
          <CardFooter className="flex justify-end">
            <Button color="primary" type="submit">
              Guardar
            </Button>
          </CardFooter>
        </form>
      )}
    </Card>
  );
}

export default Configuration;
