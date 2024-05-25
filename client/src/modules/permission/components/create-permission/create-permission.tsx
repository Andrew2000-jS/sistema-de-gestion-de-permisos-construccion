"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Textarea,
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import OwnerForm from "./owner-form";
import ConstructionForm from "./construction-form";
import ConstructionFormArea from "./construction-form-area";
import { permissionCreatorAdapter } from "../../adapters";
import {
  createConstruction,
  createOwner,
  createPermission,
  deleteConstruction,
  deleteOwner,
} from "../../services";
import { AlertMessage, AnimatedMessage } from "@/lib";
import { useSubmit } from "@/lib/common/hooks";

function CreatePermission() {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });

  const { formState, isVisible, onSubmit } = useSubmit({
    callback: async (data) => {
      const permissionInfo = permissionCreatorAdapter(data);
      const construction = await createConstruction(
        permissionInfo.construction
      );
      const owner =
        data.ownerId ?? (await createOwner(permissionInfo.owner)).data.id;

      const permission = await createPermission({
        ...permissionInfo.permission,
        constructionId: construction.data.id,
        ownerId: owner,
      });

      if (permission.statusCode !== 200) {
        await deleteOwner(owner);
        await deleteConstruction(construction.data.id);
      }

      setTimeout(() => window.location.replace("/permissions"), 3000);

      return permission;
    },
  });

  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="relative">
      <Card className="p-5 w-[30em] h-full">
        <CardHeader className="text-xl bold">Crear Permiso</CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && <OwnerForm control={control} />}
            {step === 2 && <ConstructionForm control={control} />}
            {step === 3 && <ConstructionFormArea control={control} />}
            {step === 4 && (
              <div>
                <h3 className="pb-5">Datos de la construccion</h3>
                <Controller
                  name="observation"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      label="Observación"
                      placeholder="Ingrese aquí alguna observación relacionada con el permiso"
                      description="Este campo es opcional"
                      className="w-full pb-5"
                      {...field}
                    />
                  )}
                />
              </div>
            )}
            <div className="flex justify-between">
              {step != 1 && <Button onClick={prevStep}>Anterior</Button>}
              {step < 4 && <Button onClick={nextStep}>Siguiente</Button>}
              {step === 4 && (
                <Button
                  type="submit"
                  color="primary"
                  isDisabled={formState.response.statusCode === 200 || !isValid}
                >
                  Crear permiso
                </Button>
              )}
            </div>
          </form>
        </CardBody>
      </Card>
      <AnimatedMessage
        position={["absolute", "top-2", "right-0"]}
        isVisible={isVisible}
      >
        <AlertMessage
          description={
            formState.response.statusCode === 200
              ? "Permiso creado con exito!"
              : "Algo ha salido mal"
          }
          styles={
            formState.response.statusCode !== 200
              ? ["text-red-800", "bg-red-50"]
              : ["text-green-800", "bg-green-50"]
          }
        />
      </AnimatedMessage>
    </div>
  );
}

export default CreatePermission;
