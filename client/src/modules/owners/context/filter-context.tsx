"use client";

import { createContext, useState } from "react";

export const FilterCtx = createContext<any>(null);

export function FilterCtxProvider({ children }: { children: React.ReactNode }) {
  const [filterData, setFilterData] = useState<any>(null);
  return (
    <FilterCtx.Provider value={{ filterData, setFilterData }}>
      {children}
    </FilterCtx.Provider>
  );
}
