"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import {
  AlertMessage,
  AnimatedMessage,
  nameRegex,
  positiveNumberRegex,
} from "@/lib";
import { useSubmit } from "@/lib/common/hooks";
import { createOwner } from "@/modules/owners";
import { useRouter } from "next/navigation";

function CreateOwner() {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    mode: "onChange",
  });

  const { formState, onSubmit } = useSubmit({
    callback: async ({ name, address, ci }) => {
      const response = await createOwner({ name, address, ci: Number(ci) });
      response.statusCode === 200 &&
        setTimeout(() => router.replace("/owners"), 3000);
      return response;
    },
  });

  return (
    <Card className="w-[30em] relative">
      <CardHeader className="text-xl bold">Crear propietario</CardHeader>
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody>
          <div>
            <div className="flex justify-between pb-5 gap-2">
              <Controller
                name="ci"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    isRequired
                    type="number"
                    label="C.I Propietario"
                    className="w-full"
                    variant="bordered"
                    validate={positiveNumberRegex}
                    minLength={8}
                    maxLength={8}
                    {...field}
                  />
                )}
              />

              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    isRequired
                    type="text"
                    label="Nombre del propietario"
                    className="w-full"
                    variant="bordered"
                    validate={nameRegex}
                    minLength={3}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="pb-5">
              <Controller
                name="address"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    isRequired
                    type="text"
                    label="Direccion del propietario"
                    className="w-full"
                    variant="bordered"
                    minLength={5}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </CardBody>
        <CardFooter className="flex justify-end">
          <Button
            isLoading={formState.isLoading}
            isDisabled={formState.response.statusCode === 200}
            type="submit"
            color="primary"
          >
            Crear propietario
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default CreateOwner;
