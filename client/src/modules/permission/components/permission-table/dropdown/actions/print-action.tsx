"use client";
import { Permission } from "@/modules/permission/permission.entity";

function PrintAction({ permission }: { permission: Permission }) {
  return <span onClick={() => console.log(permission.id)}>Imprimir</span>;
}

export default PrintAction;
