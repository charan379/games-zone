"use client";

import convertTo12HourFormat from "@/lib/utils/convertTo12HrFormat";
import Button from "@/ui/components/common/Button";
import React from "react";

const SlotCard: React.FC<SlotAvailabilityRecord> = ({
  slot,
  isBooked,
  forDate,
}) => {
  return (
    <div className="max-w-[160px] mt-4 cursor-pointer rounded-md">
      {/* prettier-ignore */}
      <Button disabled={isBooked} rounded="rounded-lg" danger={isBooked} success={!isBooked} title={isBooked ? "Not Available" : `Book Slot for ${forDate}`}>
        <h2 className="text-lg font-semibold mb-2">{slot.slotName}</h2>
        <p className="text-xs mb-2 font-semibold">
          {`${convertTo12HourFormat(slot.startTime)} - ${convertTo12HourFormat(
            slot.endTime
          )}`}
        </p>
      </Button>
    </div>
  );
};

export default SlotCard;
