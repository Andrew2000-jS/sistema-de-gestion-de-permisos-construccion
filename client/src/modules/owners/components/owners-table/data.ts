const columns = [
  { name: "CEDULA", uid: "cedula", sortable: true },
  { name: "NOMBRE", uid: "name", sortable: true },
  { name: "PERMISOS", uid: "permissionsLength", sortable: true },
  { name: "ACCIONES", uid: "actions" },
];

const filterColumns = [
  { name: "Cedula", uid: "ci" },
  { name: "Nombre", uid: "name" },
  { name: "Permiso", uid: "permissionsLength" },
];

const OWNER_COLUMNS = ["cedula", "name", "permissionsLength"];

export type ColumnsType = (typeof columns)[0];

export { OWNER_COLUMNS, columns, filterColumns };
