"use client";

import {
  AlertMessage,
  AnimatedMessage,
  nameRegex,
  statusTypeAdapter,
  useRequest,
  useSubmit,
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
import { useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Owner as IOwner } from "../owner.entity";
import { filterOwner, updateOwner } from "../services";

function Owner() {
  const { id } = useParams();
  const { requestData } = useRequest<IOwner>(filterOwner, {
    id,
  });

  const { control, handleSubmit } = useForm({
    defaultValues: requestData.data[0],
  });

  const { formState, onSubmit } = useSubmit({
    callback: async (ownerData: Omit<IOwner, "id" | "permission">) => {
      return await updateOwner(initialValues.id, {
        ...ownerData,
        ci: Number(ownerData.ci),
      });
    },
  });

  const initialValues: IOwner = requestData.data[0];

  return (
    <Card shadow="sm" className="w-[30em] h-[450px]">
      {requestData.loading ? (
        <div className="h-full w-full flex flex-col items-center justify-center">
          <Spinner size="md" />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <h1>Propietario</h1>
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
                    description="Nombre del propietario"
                    type="text"
                    validate={nameRegex}
                    {...field}
                  />
                )}
              />
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
                    description="Cedula del propietario"
                    type="number"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="col-span-2 pb-5">
              <Controller
                name="address"
                control={control}
                defaultValue={initialValues.address}
                render={({ field }) => (
                  <Input
                    description="Dirección del propietario"
                    type="text"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                description="Fecha de creacion"
                type="date"
                readOnly
                value={format(initialValues.createdAt as string, "yyyy-MM-dd")}
              />

              <Input
                description="Fecha de actualizacion"
                type="date"
                readOnly
                value={format(initialValues.updatedAt as string, "yyyy-MM-dd")}
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

export default Owner;
