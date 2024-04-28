import { ChipProps } from "@nextui-org/react";

const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "CEDULA", uid: "cedula"},
  {name: "NÚMERO DE RECIBO", uid: "receiptNo", sortable: true},
  {name: "MONTO", uid: "amount", sortable: true},
  {name: "FECHA", uid: "date", sortable: true},
  {name: "CIV", uid: "civ"},
  {name: "CANTIDAD", uid: "quantity"},
  {name: "ESTADO", uid: "status", sortable: true},
  {name: "ACCIONES", uid: "actions"},
];

const statusOptions = [
  {name: "Pendiente", uid: "pending"},
  {name: "Aprovado", uid: "approved"},
  {name: "Rechazado", uid: "rejected"},
  {name: "En Proceso", uid: "in_progress"},
  {name: "Completado", uid: "completed"},
  {name: "Cancelado", uid: "canceled"},
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  approved: "success",
  rejected: "danger",
  pending: "warning",
};

const filterColumns = [
  {name: "Número de Recibo", uid: "receiptNo"},
  {name: "Monto", uid: "amount"},
  {name: "CIV", uid: "civ"},
  {name: "Cantidad", uid: "quantity"},
  {name: "Cedula", uid: "cedula"},
];


export type StatusUid = typeof statusOptions[number]["uid"];
export type ColumnsType = typeof columns[0]
export type StatusOptionsType = typeof statusOptions[0]

export {columns, statusOptions, statusColorMap, filterColumns};
