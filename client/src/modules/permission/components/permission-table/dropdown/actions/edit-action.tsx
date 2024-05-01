"use client";
import { Permission } from "@/modules/permission/permission.entity";

function EditAction({ permission }: { permission: Permission }) {
  return <span onClick={() => console.log(permission.id)}>Editar</span>;
}

export default EditAction;
