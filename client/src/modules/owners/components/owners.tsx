"use client";

import { useRequest } from "@/lib/common/hooks";
import { Owner as IOwner } from "../owner.entity";
import { getOwners } from "../services";
import { OwnersTable } from "./owners-table";
import { FilterCtxProvider } from "../context";

function Owners() {
  const { requestData } = useRequest<IOwner[]>(getOwners);

  return (
    <FilterCtxProvider>
      <OwnersTable {...requestData} />
    </FilterCtxProvider>
  );
}

export default Owners;
