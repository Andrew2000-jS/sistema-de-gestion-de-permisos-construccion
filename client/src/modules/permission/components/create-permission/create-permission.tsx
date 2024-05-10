"use client";

import { useState } from "react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import OwnerForm from "./owner-form";
import ConstructionForm from "./construction-form";
import ConstructionFormArea from "./construction-form-area";
import { permissionCreatorAdapter } from "./adapters";
import {
  createConstruction,
  createOwner,
  createPermission,
} from "../../services";
import { AlertMessage, AnimatedMessage } from "@/lib";

function CreatePermission() {
  const [formData, setFormData] = useState<any>({
    message: null,
    loading: false,
    status: null,
    disabled: false,
  });
  const { control, handleSubmit } = useForm();
  const [step, setStep] = useState(1);

  const onSubmit = async (data) => {
    const permissionInfo = permissionCreatorAdapter(data);
    const construction = await createConstruction(permissionInfo.construction);
    const owner = await createOwner(permissionInfo.owner);
    const permission = await createPermission({
      ...permissionInfo.permission,
      constructionId: construction.data.id,
      ownerId: owner.data.id,
    });

    setFormData((prev) => ({
      ...prev,
      status: permission.statusCode,
      message: permission.message,
    }));

    if (permission.statusCode === 200) {
      setFormData((prev) => ({
        ...prev,
        disabled: true,
      }));
      setTimeout(() => window.location.replace("/permissions"), 3000);
    }
  };

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
            <div className="flex justify-between">
              {step != 1 && <Button onClick={prevStep}>Anterior</Button>}
              {step < 3 && <Button onClick={nextStep}>Siguiente</Button>}
              {step === 3 && (
                <Button
                  type="submit"
                  color="primary"
                  isDisabled={formData.disabled}
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
        isVisible={formData.message}
      >
        <AlertMessage
          description={
            formData.status === 200
              ? "Permiso creado con exito!"
              : "Algo ha salido mal"
          }
          styles={
            formData.status !== 200
              ? ["text-red-800", "bg-red-50"]
              : ["text-green-800", "bg-green-50"]
          }
        />
      </AnimatedMessage>
    </div>
  );
}

export default CreatePermission;
