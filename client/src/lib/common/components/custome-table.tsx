"use client";

import {
  Pagination,
  Spinner,
  Table,
  TableCell,
  TableColumn,
  TableRow,
  TableBody,
  TableHeader,
} from "@nextui-org/react";

export default function CustomeTable<T>({
  topContent,
  setSortDescriptor,
  pages,
  page,
  setPage,
  tableData,
  headerColumns,
  columns,
  loadingState,
  renderCell,
  data,
  className = "",
}) {
  return (
    <>
      <Table
        className={className}
        aria-label="Table"
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
          {(item: T) => (
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
