"use client";

import React, { useCallback, useContext, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  Chip,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Input,
  Selection,
  SortDescriptor,
} from "@nextui-org/react";
import {
  ApiResponse,
  ChevronDownIcon,
  LoadingState,
  PlusIcon,
  SearchIcon,
  VerticalDotsIcon,
  capitalize,
} from "@/lib";
import { Permission } from "../../permission.entity";
import { statusColorMap, columns, statusOptions, filterColumns } from "./data";

const PERMISSION_COLUMNS = [
  "receiptNo",
  "amount",
  "date",
  "civ",
  "quantity",
  "status",
];

export default function PermissionTable({
  data,
  loading,
}: ApiResponse<Permission[]>) {
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(PERMISSION_COLUMNS)
  );
  const [filterKey, setFilterKey] = useState<Selection | any>("all");
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "date",
    direction: "ascending",
  });

  const rowsPerPage = 10;

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const pages = useMemo(() => {
    return data?.length ? Math.ceil(data.length / rowsPerPage) : 0;
  }, [data, rowsPerPage]);

  const loadingState: LoadingState =
    loading || data?.length === 0 ? "loading" : "idle";

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const filteredItems = useMemo(() => {
    let filteredData = data;
    const key = filterKey.currentKey ?? "ci";

    if (Boolean(filterValue)) {
      filteredData = filteredData.filter((item) =>
        item[key]?.toString().toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredData = filteredData.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredData;
  }, [data, filterValue, statusFilter, filterKey]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    if (!filteredItems) {
      return "";
    }

    return filteredItems?.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Permission, b: Permission) => {
      const first = a[sortDescriptor.column as keyof Permission] as number;
      const second = b[sortDescriptor.column as keyof Permission] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

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
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                  color="primary"
                >
                  Filtrar por
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Filter Key"
                closeOnSelect={false}
                selectedKeys={"ci"}
                selectionMode="single"
                onSelectionChange={setFilterKey}
              >
                {filterColumns.map((permission) => (
                  <DropdownItem key={permission.uid} className="capitalize">
                    {capitalize(permission.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                  color="primary"
                >
                  Estado
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button variant="flat" color="primary">
              Buscar por fecha
            </Button>
            <Button color="primary" endContent={<PlusIcon />}>
              Crear permiso
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total de permisos: {data?.length ?? 0}
          </span>
          <span className="text-default-400 text-small">
            Filtro seleccionado:
            {filterColumns.find((cols) => cols.uid === filterKey.currentKey)
              ?.name ?? "Cedula"}
          </span>
        </div>
      </div>
    );
  }, [filterValue, onClear, onSearchChange, data, statusFilter, filterKey]);

  const renderCell = useCallback(
    (permission: Permission, columnKey: React.Key) => {
      const cellValue = permission[columnKey as keyof Permission];

      if (columnKey === "status") {
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[permission.status]}
            size="sm"
            variant="flat"
          >
            {permission.status}
          </Chip>
        );
      } else if (columnKey === "actions") {
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Visualizar</DropdownItem>
                <DropdownItem>Editar</DropdownItem>
                <DropdownItem>Eliminar</DropdownItem>
                <DropdownItem>Imprimir</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      } else {
        return cellValue;
      }
    },
    []
  );

  return (
    <>
      <Table
        aria-label="Example table with client async pagination"
        topContent={topContent}
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
          {columns.map(({ name, uid }) => (
            <TableColumn key={uid}>{name}</TableColumn>
          ))}
        </TableHeader>
        <TableBody
          emptyContent={"No se encontraron coinicencias"}
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
