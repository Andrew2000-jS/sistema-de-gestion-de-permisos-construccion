"use client";

import { Chip } from "@nextui-org/react";
import { statusColorMap, statusOptions } from "./data";

function StatusChip({ permission }) {
  return (
    <Chip
      className="capitalize"
      color={statusColorMap[permission.status.toString().toLowerCase()]}
      size="sm"
      variant="flat"
    >
      {
        statusOptions.find(
          (item) => item.uid === permission.status.toString().toLowerCase()
        )?.name
      }
    </Chip>
  );
}

export default StatusChip;
