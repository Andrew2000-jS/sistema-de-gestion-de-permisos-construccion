import { Permission } from "../permission/entities";

export type Owner = {
  id: string
  name: string;
  address: string;
  ci: number;
  permission: Permission[]
  createdAt?: string
  updatedAt?: string
};
