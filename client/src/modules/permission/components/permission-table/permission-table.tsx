"use client";

import React, { useCallback, useContext, useMemo } from "react";
import { ApiResponse, CustomeTable } from "@/lib";
import { Permission } from "../../entities/permission.entity";
import {
  columns,
  filterColumns,
  PERMISSION_COLUMNS,
  statusOptions,
} from "./data";
import { format } from "date-fns";
import { FilterCtx } from "../../context";
import { ActionsDropdown } from "./dropdown";
import StatusChip from "./status-chip";
import TopContent from "./top-content";
import { usePagination } from "@/lib/common/hooks";

export default function PermissionTable({
  data,
  loading,
}: ApiResponse<Permission[]>) {
  const { filterData } = useContext(FilterCtx);

  const {
    headerColumns,
    loadingState,
    onClear,
    onSearchChange,
    pages,
    setFilterKey,
    filterValue,
    setSortDescriptor,
    setStatusFilter,
    tableData,
    statusFilter,
    filterKey,
    page,
    setPage,
  } = usePagination<Permission>({
    data,
    loading,
    filterData,
    columns,
    statusOptions,
    TYPE_COLUMNS: PERMISSION_COLUMNS,
  });

  const topContent = useMemo(
    () => (
      <TopContent
        filterValue={filterValue}
        data={tableData}
        filterColumns={filterColumns}
        filterKey={filterKey}
        onClear={onClear}
        onSearchChange={onSearchChange}
        setFilterKey={setFilterKey}
        setStatusFilter={setStatusFilter}
        statusFilter={statusFilter}
      />
    ),
    [
      filterValue,
      onClear,
      onSearchChange,
      tableData,
      statusFilter,
      filterKey,
      setFilterKey,
      setStatusFilter,
    ]
  );

  const renderCell = useCallback(
    (permission: Permission, columnKey: React.Key) => {
      const cellValue = permission[columnKey as keyof Permission];
      if (columnKey === "status") {
        return <StatusChip permission={permission} />;
      } else if (columnKey === "actions") {
        return <ActionsDropdown permission={permission} />;
      } else if (columnKey === "date") {
        return format(cellValue.toString(), "dd/MM/yyyy");
      } else if (columnKey === "cedula") {
        return permission.owner.ci.toString();
      } else if (columnKey === "amount") {
        return permission.amount.toFixed(2);
      } else {
        return cellValue?.toString();
      }
    },
    []
  );

  return (
    <CustomeTable
      columns={columns}
      data={data}
      headerColumns={headerColumns}
      loadingState={loadingState}
      page={page}
      pages={pages}
      renderCell={renderCell}
      setPage={setPage}
      setSortDescriptor={setSortDescriptor}
      tableData={tableData}
      topContent={topContent}
    />
  );
}
