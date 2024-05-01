"use client";

import { Input } from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { nameRegex, positiveNumberRegex } from "./validations";

function ConstructionFormArea({ control }) {
  return (
    <div>
      <h3 className="pb-5">Datos de la construccion</h3>
      <div className="flex justify-between pb-5 gap-2">
        <Controller
          name="constructionArea"
          control={control}
          render={({ field }) => (
            <Input
              isRequired
              type="text"
              label="Area de construccion"
              className="w-full"
              variant="bordered"
              minLength={5}
              {...field}
            />
          )}
        />
        <Controller
          name="landArea"
          control={control}
          render={({ field }) => (
            <Input
              isRequired
              type="text"
              label="Area del terreno"
              className="w-full"
              variant="bordered"
              minLength={5}
              {...field}
            />
          )}
        />
      </div>
      <div className="pb-5">
        <Controller
          name="CIV"
          control={control}
          render={({ field }) => (
            <Input
              isRequired
              type="text"
              label="Area de construccion"
              className="w-full"
              variant="bordered"
              minLength={5}
              {...field}
            />
          )}
        />
      </div>
      <div className="flex justify-between pb-5 gap-2">
        <Controller
          name="workAmount"
          control={control}
          render={({ field }) => (
            <Input
              isRequired
              type="text"
              label="Costo de la obra"
              className="w-full"
              variant="bordered"
              validate={positiveNumberRegex}
              {...field}
            />
          )}
        />
        <Controller
          name="landAmount"
          control={control}
          render={({ field }) => (
            <Input
              isRequired
              type="text"
              label="Costo del terreno"
              className="w-full"
              variant="bordered"
              validate={positiveNumberRegex}
              {...field}
            />
          )}
        />
      </div>
      <div className="flex justify-between pb-5 gap-2">
        <Controller
          name="tax"
          control={control}
          render={({ field }) => (
            <Input
              isRequired
              type="text"
              label="Impuesto municipal"
              className="w-full"
              variant="bordered"
              validate={positiveNumberRegex}
              {...field}
            />
          )}
        />
        <Controller
          name="engineer"
          control={control}
          render={({ field }) => (
            <Input
              isRequired
              type="text"
              label="Ingeniero responsable"
              className="w-full"
              variant="bordered"
              validate={nameRegex}
              {...field}
            />
          )}
        />
      </div>
      <div className="pb-5">
        <Controller
          name="receiptNo"
          control={control}
          render={({ field }) => (
            <Input
              isRequired
              type="text"
              label="Recibo"
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

export default ConstructionFormArea;
