"use client";

import { Input } from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { nameRegex, positiveNumberRegex } from "@/lib";

function ConstructionFormArea({ control }) {
  return (
    <div>
      <h3 className="pb-5">Datos de la construcción</h3>
      <div className="max-h-[300px] overflow-y-auto">
        <div className="flex justify-between pb-5 gap-2">
          <Controller
            name="constructionArea"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                isRequired
                type="number"
                label="Area de construcción"
                className="w-full"
                variant="bordered"
                minLength={1}
                description={"En m²2"}
                validate={positiveNumberRegex}
                {...field}
              />
            )}
          />
          <Controller
            name="landArea"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                isRequired
                type="number"
                label="Área del terreno"
                className="w-full"
                validate={positiveNumberRegex}
                description={"En m²2"}
                variant="bordered"
                minLength={1}
                {...field}
              />
            )}
          />
        </div>
        <div className="flex justify-between pb-5 gap-2">
          <Controller
            name="civ"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                isRequired
                type="text"
                label="C.I.V"
                className="w-full"
                variant="bordered"
                minLength={5}
                {...field}
              />
            )}
          />
          <Controller
            name="constructionCompany"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                isRequired
                type="text"
                label="Compañia de construcción"
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
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                isRequired
                type="number"
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
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                isRequired
                type="number"
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
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                isRequired
                type="number"
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
            rules={{ required: true }}
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
            rules={{ required: true }}
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
    </div>
  );
}

export default ConstructionFormArea;
