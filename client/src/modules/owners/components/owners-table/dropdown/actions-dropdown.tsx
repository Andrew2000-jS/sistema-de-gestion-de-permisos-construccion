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
import { useRouter } from "next/navigation";
import { Owner } from "@/modules/owners/owner.entity";
import DeleteDialog from "./delete-dialog";

export interface ActionsProps {
  owner: Owner;
}

function DropdownActions({ owner }: ActionsProps) {
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
          <DropdownItem onClick={() => router.replace(`/owners/${owner.id}`)}>
            Ver
          </DropdownItem>
          <DropdownItem onClick={onOpenChange}>Eliminar</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <DeleteDialog id={owner.id} onOpenChange={onOpenChange} isOpen={isOpen} />
    </div>
  );
}

export default DropdownActions;
