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
import { Permission } from "@/modules/permission/permission.entity";
import ViewAction from "./actions/view-action";
import EditAction from "./actions/edit-action";
import PrintAction from "./actions/print-action";
import DeleteDialog from "./actions/delete-dialog";

export interface ActionsProps {
  permission: Permission;
}

function Actions({ permission }: ActionsProps) {
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
          <DropdownItem>
            <ViewAction permission={permission} />
          </DropdownItem>
          <DropdownItem>
            <EditAction permission={permission} />
          </DropdownItem>
          <DropdownItem>
            <span onClick={onOpenChange}>Eliminar</span>
          </DropdownItem>
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

export default Actions;
