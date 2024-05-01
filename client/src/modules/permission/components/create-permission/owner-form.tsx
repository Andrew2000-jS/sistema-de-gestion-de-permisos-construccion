"use client";

import { Input } from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { nameRegex, positiveNumberRegex } from "./validations";

function OwnerForm({ control }) {
  return (
    <div>
      <h3 className="pb-5">Datos del propietario</h3>
      <div className="flex justify-between pb-5 gap-2">
        <Controller
          name="OwnerCi"
          control={control}
          render={({ field }) => (
            <Input
              isRequired
              type="text"
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
          name="ownerName"
          control={control}
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
          name="ownerAddress"
          control={control}
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
  );
}

export default OwnerForm;
