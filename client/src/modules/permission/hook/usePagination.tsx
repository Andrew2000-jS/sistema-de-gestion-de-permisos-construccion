import React, { useCallback, useMemo, useState } from "react";
import {
  PERMISSION_COLUMNS,
  columns,
  statusOptions,
} from "../components/permission-table/data";
import { SortDescriptor, Selection } from "@nextui-org/react";
import { LoadingState } from "@/lib";
import { parse } from "date-fns/parse";
import { Permission } from "../permission.entity";

function usePagination({ data, loading, filterData, rowsPerPage = 10 }) {
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns] = React.useState<Selection>(
    new Set(PERMISSION_COLUMNS)
  );
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
  }, [visibleColumns]);

  const pages = useMemo(() => {
    return data?.length ? Math.ceil(data.length / rowsPerPage) : 0;
  }, [data, rowsPerPage]);

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
    let filteredPermissions = data;
    const key = filterKey.currentKey ?? "ci";

    if (Boolean(filterValue)) {
      filteredPermissions = filteredPermissions.filter((item) =>
        item[key]?.toString().toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredPermissions = filteredPermissions.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }
    if (filterData) {
      const { init_date, end_date } = filterData;
      const initDate = parse(init_date, "d/M/yyyy", new Date());
      const EndDate = parse(end_date, "d/M/yyyy", new Date());

      filteredPermissions = filteredPermissions.filter(
        (item) =>
          new Date(item.date) >= initDate && new Date(item.date) <= EndDate
      );
    }

    return filteredPermissions;
  }, [data, filterValue, statusFilter, filterKey, filterData]);

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
    sortedItems,
    onClear,
    filterValue,
    statusFilter,
    filterKey,
    setPage,
  };
}

export default usePagination;
