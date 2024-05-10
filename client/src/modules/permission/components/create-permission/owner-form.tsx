"use client";

import { Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { nameRegex, positiveNumberRegex } from "./validations";
import { useState } from "react";
import { useRequest } from "@/lib/common/hooks";
import { getOwners } from "../../services";
import { Owner } from "../../entities/owner.entity";

function OwnerForm({ control }) {
  const [isOwnerExist, setIsOwnerExist] = useState(false);
  const { requestData } = useRequest<Owner[]>(getOwners);
  return (
    <div>
      <h3 className="pb-5">Datos del propietario</h3>
      {isOwnerExist ? (
        <div className="pb-5">
          <Controller
            name="constructionType"
            control={control}
            render={({ field }) => (
              <Select
                isRequired
                label="Propietarios"
                placeholder="Seleccione el propietario"
                className="w-full"
                {...field}
              >
                {requestData.data.map((item) => (
                  <SelectItem key={item.ci} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
        </div>
      ) : (
        <div>
          <div className="flex justify-between pb-5 gap-2">
            <Controller
              name="ownerCi"
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
      )}

      <div className="pb-5">
        <Checkbox size="sm" onChange={(e) => setIsOwnerExist(e.target.checked)}>
          Existe el propietario?
        </Checkbox>
      </div>
    </div>
  );
}

export default OwnerForm;
