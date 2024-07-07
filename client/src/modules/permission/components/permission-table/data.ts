import { ChipProps } from "@nextui-org/react";

const columns = [
  {name: "CÉDULA", uid: "cedula", sortable: true},
  {name: "NÚMERO DE RECIBO", uid: "receiptNo", sortable: true},
  {name: "MONTO", uid: "amount", sortable: true},
  {name: "FECHA", uid: "date", sortable: true},
  {name: "CIV", uid: "civ", sortable: true},
  {name: "CANTIDAD", uid: "quantity", sortable: true},
  {name: "ESTADO", uid: "status", sortable: true},
  {name: "ACCIONES", uid: "actions"},
];

const statusOptions = [
  {name: "Pendiente", uid: "pending"},
  {name: "Aprobado", uid: "approved"},
  {name: "Rechazado", uid: "rejected"},
  {name: "En Proceso", uid: "in_progress"},
  {name: "Completado", uid: "completed"},
  {name: "Cancelado", uid: "canceled"},
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
  in_progress: "primary",
  completed: "success",
  canceled: "danger",
};
const filterColumns = [
  {name: "Número de Recibo", uid: "receiptNo"},
  {name: "Monto", uid: "amount"},
  {name: "CIV", uid: "civ"},
  {name: "Cantidad", uid: "quantity"},
  {name: "Cédula", uid: "ci"},
];

const PERMISSION_COLUMNS = [
  "receiptNo",
  "amount",
  "date",
  "civ",
  "quantity",
  "status",
];

export type StatusUid = typeof statusOptions[number]["uid"];
export type ColumnsType = typeof columns[0]
export type StatusOptionsType = typeof statusOptions[0]

export {columns, statusOptions, statusColorMap, filterColumns, PERMISSION_COLUMNS};
