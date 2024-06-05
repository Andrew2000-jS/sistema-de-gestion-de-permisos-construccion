"use client";

import { FilterDropdown, PlusIcon, SearchIcon } from "@/lib";
import Link from "next/link";
import { Button, Input } from "@nextui-org/react";

function TopContent({
  filterValue,
  onClear,
  onSearchChange,
  data,
  setFilterKey,
  filterColumns,
  filterKey,
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[30%]"
          placeholder="Buscar propietarios"
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          <FilterDropdown
            setFilterKey={setFilterKey}
            filterColumns={filterColumns}
          />
          <Link href={"/owners/create"}>
            <Button color="primary" endContent={<PlusIcon />}>
              Crear propietario
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total de propietarios: {data?.length ?? 0}
        </span>
        <span className="text-default-400 text-small">
          Filtro seleccionado:{" "}
          {filterColumns.find((cols) => cols.uid === filterKey.currentKey)
            ?.name ?? "Cedula"}
        </span>
      </div>
    </div>
  );
}

export default TopContent;
