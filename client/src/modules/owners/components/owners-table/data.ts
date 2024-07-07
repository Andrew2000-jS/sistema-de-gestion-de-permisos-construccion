const columns = [
  { name: "CÉDULA", uid: "cedula", sortable: true },
  { name: "NOMBRE", uid: "name", sortable: true },
  { name: "NÚM. DE PERMISOS", uid: "permissionsLength", sortable: true },
  { name: "FECHA DE CREACIÓN", uid: "createdAt", sortable: true },
  { name: "FECHA DE ACTUALIZACIÓN", uid: "updatedAt", sortable: true },
  { name: "ACCIONES", uid: "actions" },
];

const filterColumns = [
  { name: "Cédula", uid: "ci" },
  { name: "Nombre", uid: "name" },
  { name: "Fecha de creación", uid: "createdAt"},
  { name: "Fecha de actualización", uid: "updatedAt"},
];

const OWNER_COLUMNS = ["cédula", "name", "permissionsLength", "createdAt", "updatedAt"];

export type ColumnsType = (typeof columns)[0];

export { OWNER_COLUMNS, columns, filterColumns };
