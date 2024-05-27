import { Status } from "../entities";

export const permissionStatusObj = [
  { name: "Aprobado", uid: Status.APPROVED },
  { name: "Cancelado", uid: Status.CANCELED },
  { name: "Completado", uid: Status.COMPLETED },
  { name: "Pendiente", uid: Status.PENDING },
];
