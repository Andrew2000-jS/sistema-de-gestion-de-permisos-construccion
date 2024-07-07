"use client";

import { Input, Select, SelectItem } from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { constructionTypeColumns } from "./data";
import {
  nameRegex,
  positiveNumberRegex,
} from "../../../../lib/common/utils/validations";

function ConstructionForm({ control }) {
  return (
    <div>
      <h3 className="pb-5">Datos de la construccion</h3>
      <div className="max-h-[300px] overflow-y-auto">
        <div className="flex justify-between pb-5 gap-2">
          <Controller
            name="population"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                isRequired
                type="number"
                label="Población"
                className="w-full"
                validate={positiveNumberRegex}
                variant="bordered"
                {...field}
              />
            )}
          />

          <Controller
            name="sanitaryPermit"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                isRequired
                type="text"
                label="Permiso sanitario"
                minLength={5}
                className="w-full"
                variant="bordered"
                {...field}
              />
            )}
          />
        </div>
        <div className="flex justify-between pb-5 gap-2">
          <Controller
            name="constructionAddress"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                isRequired
                type="text"
                label="Dirección de la obra..."
                className="w-full"
                minLength={5}
                variant="bordered"
                {...field}
              />
            )}
          />
          <Controller
            name="constructionDestination"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                isRequired
                type="text"
                label="Destino de la obra..."
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
            name="floorsNo"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                isRequired
                type="number"
                label="Número de pisos"
                className="w-full"
                variant="bordered"
                validate={positiveNumberRegex}
                {...field}
              />
            )}
          />
          <Controller
            name="constructionType"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                isRequired
                label="Tipo de construcción"
                placeholder="Seleccione el tipo de construcción"
                className="w-full"
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
        <div className="flex justify-between pb-5 gap-2">
          <Controller
            name="calculatingEngineer"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                isRequired
                type="text"
                label="Ingeniero calculista"
                className="w-full"
                variant="bordered"
                minLength={2}
                validate={nameRegex}
                {...field}
              />
            )}
          />
          <Controller
            name="constructionConstructor"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                isRequired
                type="text"
                label="Nombre del constructor"
                className="w-full"
                variant="bordered"
                minLength={2}
                validate={nameRegex}
                {...field}
              />
            )}
          />
        </div>
        <div className="pb-5">
          <Controller
            name="date"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                isRequired
                type="date"
                label="Fecha de permiso"
                className="w-full"
                variant="bordered"
                {...field}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default ConstructionForm;
