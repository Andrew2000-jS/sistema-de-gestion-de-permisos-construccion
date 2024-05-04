"use client";

import { PlusIcon, SearchIcon } from "@/lib";
import { FilterDropdown, StatusDropdown } from "./dropdown";
import PermissionDateDialog from "./permission-date-dialog";
import Link from "next/link";
import { Button, Input } from "@nextui-org/react";

function TopContent({
  filterValue,
  onClear,
  onSearchChange,
  data,
  setFilterKey,
  statusFilter,
  setStatusFilter,
  filterColumns,
  filterKey,
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Buscar permisos"
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          <FilterDropdown setFilterKey={setFilterKey} />
          <StatusDropdown
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
          <PermissionDateDialog />
          <Link href={"/permissions/create"}>
            <Button color="primary" endContent={<PlusIcon />}>
              Crear permiso
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total de permisos: {data?.length ?? 0}
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
