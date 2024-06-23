import { Owner } from "@/modules/owners";
import { Construction } from "./construction.entity";

export const enum Status {
  PENDING = "Pending",
  APPROVED = "Approved",
  REJECTED = "Rejected",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
  CANCELED = "Canceled",
}

export type Permission = {
  id: number;
  date: Date;
  quantity: number;
  amount: number;
  civ: number;
  observation: string;
  receiptNo: string;
  status: Status;
  constructionId: number;
  ownerId: number;
  userId: string;
  owner: Owner;
  construction: Construction
};
