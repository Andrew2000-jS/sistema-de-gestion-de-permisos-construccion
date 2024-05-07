"use client";

import React, { useCallback, useContext, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import { ApiResponse } from "@/lib";
import { Permission } from "../../entities/permission.entity";
import { columns, filterColumns } from "./data";
import { format } from "date-fns";
import { FilterCtx } from "../../context";
import { ActionsDropdown } from "./dropdown";
import StatusChip from "./status-chip";
import { usePagination } from "../../hook";
import TopContent from "./top-content";

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
  } = usePagination({ data, loading, filterData });

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
      } else {
        return cellValue?.toString();
      }
    },
    []
  );

  return (
    <>
      <Table
        aria-label="Permission table"
        topContent={topContent}
        onSortChange={setSortDescriptor}
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }
        {...tableData}
      >
        <TableHeader columns={headerColumns}>
          {columns.map(({ name, uid, sortable }) => (
            <TableColumn key={uid} allowsSorting={sortable}>
              {name}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody
          emptyContent={"No se encontraron coincidencias"}
          items={tableData}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item: Permission) => (
            <TableRow key={data?.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
