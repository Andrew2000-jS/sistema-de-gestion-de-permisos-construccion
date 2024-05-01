"use client";
import { ChevronDownIcon, capitalize } from "@/lib";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { filterColumns } from "../data";

function Filter({ setFilterKey }) {
  return (
    <Dropdown>
      <DropdownTrigger className="hidden sm:flex">
        <Button
          endContent={<ChevronDownIcon className="text-small" />}
          variant="flat"
          color="primary"
        >
          Filtrar por
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Table Filter Key"
        closeOnSelect={false}
        selectedKeys={"ci"}
        selectionMode="single"
        onSelectionChange={setFilterKey}
      >
        {filterColumns.map((permission) => (
          <DropdownItem key={permission.uid} className="capitalize">
            {capitalize(permission.name)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default Filter;
