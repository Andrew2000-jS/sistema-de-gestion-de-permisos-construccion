"use client";

import { useEffect, useState } from "react";
import { getPermissions } from "../services";
import { ApiResponse } from "@/lib";
import { Permission as IPermission } from "../entities/permission.entity";
import { PermissionTable } from "./permission-table";
import { FilterCtxProvider } from "../context";

function Permission() {
  const [data, setData] = useState<ApiResponse<IPermission[]>>({
    message: null,
    data: null,
    statusCode: null,
    loading: true,
  });

  useEffect(() => {
    getPermissions()
      .then((res) =>
        setData({
          message: res.message as string,
          statusCode: res.statusCode,
          loading: false,
          data: res.data,
        })
      )
      .catch((error) =>
        setData({
          message: (error as Record<string, string>).message ?? null,
          statusCode: (error as Record<string, number>).statusCode ?? null,
          data: (error as Record<string, number>).data ?? null,
          loading: false,
        })
      );
  }, []);

  return (
    <FilterCtxProvider>
      <PermissionTable
        data={data.data}
        message={data.message}
        loading={data.loading}
        statusCode={data.statusCode}
      />
    </FilterCtxProvider>
  );
}

export default Permission;
