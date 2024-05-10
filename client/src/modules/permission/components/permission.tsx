"use client";

import { getPermissions } from "../services";
import { Permission as IPermission } from "../entities/permission.entity";
import { PermissionTable } from "./permission-table";
import { FilterCtxProvider } from "../context";
import { useRequest } from "@/lib/common/hooks";

function Permission() {
  const { requestData } = useRequest<IPermission[]>(getPermissions);

  return (
    <FilterCtxProvider>
      <PermissionTable
        data={requestData.data}
        message={requestData.message}
        loading={requestData.loading}
        statusCode={requestData.statusCode}
      />
    </FilterCtxProvider>
  );
}

export default Permission;
