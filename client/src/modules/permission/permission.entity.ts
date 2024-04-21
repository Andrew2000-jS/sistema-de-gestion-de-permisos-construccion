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
  CIV: number;
  observation: string;
  receiptNo: string;
  status: Status;
  constructionId: number;
  ownerId: number;
};
