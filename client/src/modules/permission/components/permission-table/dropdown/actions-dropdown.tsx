"use client";

import { VerticalDotsIcon } from "@/lib";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { Permission } from "@/modules/permission/entities/permission.entity";
import PrintAction from "./actions/print-action";
import DeleteDialog from "./actions/delete-dialog";
import { useRouter } from "next/navigation";

export interface ActionsProps {
  permission: Permission;
}

function ActionsDropDown({ permission }: ActionsProps) {
  const router = useRouter();
  const { onOpenChange, isOpen } = useDisclosure();
  return (
    <div className="relative flex justify-end items-center gap-2">
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light">
            <VerticalDotsIcon className="text-default-300" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem
            onClick={() => router.replace(`/permissions/${permission.id}`)}
          >
            Ver
          </DropdownItem>
          <DropdownItem onClick={onOpenChange}>Eliminar</DropdownItem>
          <DropdownItem>
            <PrintAction permission={permission} />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <DeleteDialog
        id={permission.id}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
      />
    </div>
  );
}

export default ActionsDropDown;
