"use client";

import { ApiResponse, CustomeTable, usePagination } from "@/lib";
import { Owner } from "../../owner.entity";
import { OWNER_COLUMNS, columns, filterColumns } from "./data";
import { useCallback, useContext, useMemo } from "react";
import { FilterCtx } from "../../context";
import TopContent from "./top-content";
import { ActionsDropdown } from "./dropdown";
import { format } from "date-fns";

function OwnersTable({ data, loading }: ApiResponse<Owner[]>) {
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
    tableData,
    filterKey,
    page,
    setPage,
  } = usePagination<Owner>({
    data,
    loading,
    filterData,
    columns,
    statusOptions: "all",
    TYPE_COLUMNS: OWNER_COLUMNS,
    ctx: "owner",
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
      />
    ),
    [filterValue, onClear, onSearchChange, tableData, filterKey, setFilterKey]
  );

  const renderCell = useCallback((owner: Owner, columnKey: React.Key) => {
    const cellValue = owner[columnKey as keyof Owner];
    if (columnKey === "actions") {
      return <ActionsDropdown owner={owner} />;
    } else if (columnKey === "permissionsLength") {
      return owner?.permission?.length;
    } else if (columnKey === "cedula") {
      return owner.ci.toString();
    } else if (columnKey === "createdAt") {
      return format(cellValue!.toString(), "dd/MM/yyyy");
    } else if (columnKey === "updatedAt") {
      return format(cellValue!.toString(), "dd/MM/yyyy");
    } else {
      return cellValue?.toString();
    }
  }, []);

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
      className="w-[60em]"
    />
  );
}

export default OwnersTable;
