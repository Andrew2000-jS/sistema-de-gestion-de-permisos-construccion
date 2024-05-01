"use client";
import { Permission } from "@/modules/permission/permission.entity";
import { filterPermissions } from "@/modules/permission/services";

function ViewAction({ permission }: { permission: Permission }) {
  const findPermission = async (id: number) => {
    try {
      const response = await filterPermissions({ id });
      console.log(response);
    } catch (error) {
      console.error("Error al buscar el permiso:", error);
    }
  };
  return <span onClick={() => findPermission(permission.id)}>Visualizar</span>;
}

export default ViewAction;
