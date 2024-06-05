"use client";

import { getPermissions } from "../services";
import { Permission as IPermission } from "../entities/permission.entity";
import { PermissionTable } from "./permission-table";
import { FilterCtxProvider } from "../context";
import { useRequest } from "@/lib/common/hooks";

function Permissions() {
  const { requestData } = useRequest<IPermission[]>(getPermissions);

  return (
    <FilterCtxProvider>
      <PermissionTable {...requestData} />
    </FilterCtxProvider>
  );
}

export default Permissions;
