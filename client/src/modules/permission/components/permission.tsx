"use client";

import { format } from "date-fns";
import { useRequest, useSubmit } from "@/lib/common/hooks";
import { useParams } from "next/navigation";
import {
  filterPermissions,
  updateConstruction,
  updatePermissions,
} from "../services";
import { Permission as IPermission } from "../entities";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
  Input,
  Select,
  SelectItem,
  Textarea,
  Button,
} from "@nextui-org/react";
import { permissionStatusObj } from "./data";
import { Controller, useForm } from "react-hook-form";
import { constructionTypeColumns } from "./create-permission/data";
import { permissionCreatorAdapter } from "../adapters";
import { AlertMessage, AnimatedMessage, positiveNumberRegex } from "@/lib";
import { Owner, getOwners } from "@/modules/owners";

function Permission() {
  const { id } = useParams();
  const { requestData } = useRequest<IPermission>(filterPermissions, {
    id: Number(id),
  });
  const initialValues = requestData.data[0];

  const { requestData: ownerRequestData } = useRequest<Owner[]>(getOwners);
  const { control, handleSubmit } = useForm({
    defaultValues: requestData.data,
  });

  const { formState, onSubmit } = useSubmit({
    callback: async (data) => {
      const { construction, permission } = permissionCreatorAdapter(data);

      await updateConstruction(initialValues.constructionId, construction);

      return await updatePermissions(initialValues.id, {
        ...permission,
        ownerId: data.ownerId,
      });
    },
  });

  return (
    <Card shadow="sm" className="w-[30em] h-[450px]">
      {requestData.loading ? (
        <div className="h-full w-full flex flex-col items-center justify-center">
          <Spinner size="md" />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <h1>Permiso de construcción</h1>
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
              <div className="col-span-2 pb-5">
                <Controller
                  name="receiptNo"
                  control={control}
                  defaultValue={initialValues.receiptNo}
                  render={({ field }) => (
                    <Input description="Recibo" {...field} />
                  )}
                />
              </div>
              <div className="col-span-2 pb-5">
                <Controller
                  name="date"
                  control={control}
                  defaultValue={format(initialValues.date, "yyyy-MM-dd")}
                  render={({ field }) => (
                    <Input
                      description="Fecha del permiso"
                      type="date"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="col-span-1 pb-5">
                <Controller
                  name="status"
                  control={control}
                  defaultValue={initialValues.status.toString()}
                  render={({ field }) => (
                    <Select
                      label="Estado del permiso"
                      defaultSelectedKeys={[field.value]}
                      {...field}
                    >
                      {permissionStatusObj.map(({ name, uid }) => (
                        <SelectItem key={uid} value={uid}>
                          {name}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </div>
              <div className="col-span-1 pb-5">
                <Controller
                  name="ownerId"
                  control={control}
                  defaultValue={initialValues.ownerId}
                  render={({ field }) => (
                    <Select
                      label="Propietario"
                      placeholder="Seleccione el propietario"
                      className="w-full"
                      defaultSelectedKeys={[field.value]}
                      {...field}
                    >
                      {ownerRequestData.data.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </div>
              <div className="col-span-2 pb-5">
                <Controller
                  name="constructionAddress"
                  control={control}
                  defaultValue={initialValues.construction.address}
                  render={({ field }) => (
                    <Input description="Dirección" {...field} />
                  )}
                />
              </div>
              <div className="col-span-2 pb-5">
                <Controller
                  name="constructionDestination"
                  control={control}
                  defaultValue={initialValues.construction.destination}
                  render={({ field }) => (
                    <Input description="Destino de la obra" {...field} />
                  )}
                />
              </div>
              <div className="col-span-1 pb-5">
                <Controller
                  name="constructionConstructor"
                  control={control}
                  defaultValue={initialValues.construction.manager}
                  render={({ field }) => (
                    <Input description="Constructor" {...field} />
                  )}
                />
              </div>
              <div className="col-span-1 pb-5">
                <Controller
                  name="calculatingEngineer"
                  control={control}
                  defaultValue={initialValues.construction.engineer}
                  render={({ field }) => (
                    <Input description="Ingeniero calculista" {...field} />
                  )}
                />
              </div>
              <div className="col-span-1 pb-5">
                <Controller
                  name="CIV"
                  control={control}
                  defaultValue={initialValues.civ}
                  render={({ field }) => (
                    <Input description="C.I.V" {...field} />
                  )}
                />
              </div>
              <div className="col-span-1 pb-5">
                <Controller
                  name="constructionArea"
                  control={control}
                  defaultValue={
                    initialValues.construction.area.constructionArea
                  }
                  render={({ field }) => (
                    <Input
                      type="number"
                      validate={positiveNumberRegex}
                      description="Area de construcción (m²2)"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="col-span-1 pb-5">
                <Controller
                  name="landArea"
                  control={control}
                  defaultValue={initialValues.construction.area.landArea}
                  render={({ field }) => (
                    <Input
                      description="Area del terreno (m²2)"
                      type="number"
                      validate={positiveNumberRegex}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="col-span-1 pb-5">
                <Controller
                  name="floorsNo"
                  control={control}
                  defaultValue={initialValues.construction.floorsNo}
                  render={({ field }) => (
                    <Input
                      description="N.º de pisos"
                      {...field}
                      type="number"
                      validate={positiveNumberRegex}
                    />
                  )}
                />
              </div>
              <div className="col-span-1 pb-5">
                <Controller
                  name="population"
                  control={control}
                  defaultValue={initialValues.construction.population}
                  render={({ field }) => (
                    <Input
                      description="Población"
                      type="number"
                      validate={positiveNumberRegex}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="col-span-1 pb-5">
                <Controller
                  name="landAmount"
                  control={control}
                  defaultValue={initialValues.construction.amount.landAmount}
                  render={({ field }) => (
                    <Input
                      description="Costo del terreno"
                      type="number"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="col-span-1 pb-5">
                <Controller
                  name="workAmount"
                  control={control}
                  defaultValue={initialValues.construction.amount.workAmount}
                  render={({ field }) => (
                    <Input
                      description="Costo del trabajo"
                      type="number"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="col-span-1 pb-5">
                <Controller
                  name="sanitaryPermit"
                  control={control}
                  defaultValue={initialValues.construction.sanitaryPermit}
                  render={({ field }) => (
                    <Input description="Permiso sanitario" {...field} />
                  )}
                />
              </div>
              <div className="col-span-1 pb-5">
                <Controller
                  name="constructionCompany"
                  control={control}
                  defaultValue={initialValues.construction.company}
                  render={({ field }) => (
                    <Input description="Compañía" {...field} />
                  )}
                />
              </div>
              <div className="col-span-1 pb-5">
                <Controller
                  name="tax"
                  control={control}
                  defaultValue={initialValues.construction.amount.tax}
                  render={({ field }) => (
                    <Input
                      description="Impuesto municipal"
                      type="number"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="col-span-2 pb-5">
                <Controller
                  name="constructionType"
                  control={control}
                  defaultValue={initialValues.construction.type}
                  render={({ field }) => (
                    <Select
                      label="Tipo de construcción"
                      placeholder="Seleccione el tipo de construcción"
                      className="w-full"
                      defaultSelectedKeys={[field.value]}
                      {...field}
                    >
                      {constructionTypeColumns.map((item) => (
                        <SelectItem key={item.uid} value={item.uid}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </div>
              <div className="col-span-1 pb-5">
                <Input
                  description="Fecha de creacion"
                  type="date"
                  readOnly
                  value={format(
                    initialValues.createdAt as string,
                    "yyyy-MM-dd"
                  )}
                />
              </div>
              <div className="col-span-1 pb-5">
                <Input
                  description="Fecha de actualizacion"
                  type="date"
                  readOnly
                  value={format(
                    initialValues.updatedAt as string,
                    "yyyy-MM-dd"
                  )}
                />
              </div>
              <div className="col-span-2 pb-5">
                <Controller
                  name="observation"
                  control={control}
                  defaultValue={initialValues.observation}
                  render={({ field }) => (
                    <Textarea
                      label="Observación"
                      description="Este campo es opcional"
                      className="w-full pb-5"
                      {...field}
                    />
                  )}
                />
              </div>
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

export default Permission;
