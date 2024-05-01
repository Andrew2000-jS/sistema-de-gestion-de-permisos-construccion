"use client";
import { Permission } from "@/modules/permission/permission.entity";
import { deletePermissions } from "@/modules/permission/services";

function DeleteAction({ permission }: { permission: Permission }) {
  const deletePermission = async (id: number) => {
    try {
      await deletePermissions(id);
    } catch (error) {
      console.error("Error al eliminar el permiso:", error);
    }
  };
  return <span onClick={() => deletePermission(permission.id)}>Eliminar</span>;
}

export default DeleteAction;
