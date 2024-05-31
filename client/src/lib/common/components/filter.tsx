"use client";
import { ChevronDownIcon, capitalize } from "@/lib";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

function FilterDropdown({ setFilterKey, filterColumns }) {
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
        {filterColumns.map((col) => (
          <DropdownItem key={col.uid} className="capitalize">
            {capitalize(col.name)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default FilterDropdown;
