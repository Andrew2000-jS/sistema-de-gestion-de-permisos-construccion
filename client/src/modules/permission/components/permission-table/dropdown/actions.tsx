"use client";

import { VerticalDotsIcon } from "@/lib";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Permission } from "@/modules/permission/permission.entity";
import ViewAction from "./actions/view-action";
import EditAction from "./actions/edit-action";
import DeleteAction from "./actions/delete-action";
import PrintAction from "./actions/print-action";

function Actions({ permission }: { permission: Permission }) {
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
            <DeleteAction permission={permission} />
          </DropdownItem>
          <DropdownItem>
            <PrintAction permission={permission} />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default Actions;
