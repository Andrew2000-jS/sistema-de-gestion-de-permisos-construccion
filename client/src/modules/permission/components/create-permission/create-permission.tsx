"use client";

import { useState } from "react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import OwnerForm from "./owner-form";
import ConstructionForm from "./construction-form";
import ConstructionFormArea from "./construction-form-area";

function CreatePermission() {
  const { control, handleSubmit } = useForm();
  const [step, setStep] = useState(1);

  const onSubmit = (data) => {
    console.log(data);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
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
              <Button type="submit" color="primary">
                Crear permiso
              </Button>
            )}
          </div>
        </form>
      </CardBody>
    </Card>
  );
}

export default CreatePermission;
