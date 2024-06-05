import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SortDescriptor, Selection } from "@nextui-org/react";
import { LoadingState } from "@/lib";
import { parse } from "date-fns/parse";

function usePagination<T>({
  data,
  loading,
  filterData,
  columns,
  statusOptions,
  TYPE_COLUMNS,
  rowsPerPage = 10,
  setFilterData,
  ctx,
}) {
  const [tableData, setTableData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns] = React.useState<Selection>(new Set(TYPE_COLUMNS));
  const [filterKey, setFilterKey] = useState<Selection | any>("all");
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "date",
    direction: "ascending",
  });

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns, columns]);

  const pages = useMemo(() => {
    return tableData?.length ? Math.ceil(tableData.length / rowsPerPage) : 0;
  }, [tableData, rowsPerPage]);

  const loadingState: LoadingState = loading ? "loading" : "idle";

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const filteredItems = useMemo(() => {
    let filteredInfo = data;
    const key = filterKey.currentKey ?? "ci";

    if (Boolean(filterValue)) {
      filteredInfo = filteredInfo.filter((item) =>
        key === "ci"
          ? (ctx === "permission" ? item.owner.ci : item.ci)
              ?.toString()
              .toLowerCase()
              .includes(filterValue.toLowerCase())
          : item[key]
              ?.toString()
              .toLowerCase()
              .includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredInfo = filteredInfo.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }
    if (filterData) {
      const { init_date, end_date } = filterData;
      if (!init_date || !end_date) return filteredInfo;

      const initDate = parse(init_date, "d/M/yyyy", new Date());
      const EndDate = parse(end_date, "d/M/yyyy", new Date());

      filteredInfo = filteredInfo.filter(
        (item) =>
          new Date(item.date) >= initDate && new Date(item.date) <= EndDate
      );
    }

    return filteredInfo;
  }, [
    data,
    filterValue,
    statusFilter,
    filterKey,
    filterData,
    statusOptions,
    ctx,
  ]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    if (!filteredItems) {
      return "";
    }

    return filteredItems?.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: T, b: T) => {
      const first = a[sortDescriptor.column as keyof T] as number;
      const second = b[sortDescriptor.column as keyof T] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const onClearAllFilters = useCallback(() => {
    setFilterValue("");
    setFilterKey("all");
    setStatusFilter("all");
    setPage(1);
    setFilterData(null);
    setSortDescriptor({ column: "date", direction: "ascending" });
  }, [setFilterData]);

  useEffect(() => {
    setTableData(sortedItems);
  }, [sortedItems]);

  return {
    headerColumns,
    setFilterKey,
    setFilterValue,
    setStatusFilter,
    setSortDescriptor,
    pages,
    page,
    loadingState,
    onSearchChange,
    tableData,
    setTableData,
    onClear,
    filterValue,
    statusFilter,
    filterKey,
    setPage,
    onClearAllFilters,
  };
}

export default usePagination;
