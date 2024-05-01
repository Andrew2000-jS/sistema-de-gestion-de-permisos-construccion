"use client";

import React, { useCallback, useContext, useMemo } from "react";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  Button,
  Input,
} from "@nextui-org/react";
import { ApiResponse, PlusIcon, SearchIcon } from "@/lib";
import { Permission } from "../../permission.entity";
import { columns, filterColumns } from "./data";
import PermissionDate from "./permission-date";
import { format, parse } from "date-fns";
import { FilterCtx } from "../../context";
import { ActionsDropdown, FilterDropdown, StatusDropdown } from "./dropdown";
import StatusChip from "./status-chip";
import { usePagination } from "../../hook";

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
    sortedItems,
    statusFilter,
    filterKey,
    page,
    setPage,
  } = usePagination({ data, loading, filterData });

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar permisos"
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <FilterDropdown setFilterKey={setFilterKey} />
            <StatusDropdown
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
            <PermissionDate />
            <Link href={"/permissions/create"}>
              <Button color="primary" endContent={<PlusIcon />}>
                Crear permiso
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total de permisos: {data?.length ?? 0}
          </span>
          <span className="text-default-400 text-small">
            Filtro seleccionado:{" "}
            {filterColumns.find((cols) => cols.uid === filterKey.currentKey)
              ?.name ?? "Cedula"}
          </span>
        </div>
      </div>
    );
  }, [
    filterValue,
    onClear,
    onSearchChange,
    data,
    statusFilter,
    filterKey,
    setFilterKey,
    setStatusFilter,
  ]);

  const renderCell = useCallback(
    (permission: Permission, columnKey: React.Key) => {
      const cellValue = permission[columnKey as keyof Permission];
      if (columnKey === "status") {
        return <StatusChip permission={permission} />;
      } else if (columnKey === "actions") {
        return <ActionsDropdown permission={permission} />;
      } else if (columnKey === "date") {
        return format(cellValue.toString(), "dd/MM/yyyy");
      } else {
        return cellValue?.toString();
      }
    },
    []
  );

  return (
    <>
      <Table
        aria-label="Example table with client async pagination"
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
        {...data}
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
          items={sortedItems}
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
