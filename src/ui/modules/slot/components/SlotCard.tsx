"use client";

import convertTo12HourFormat from "@/lib/utils/convertTo12HrFormat";
import Button from "@/ui/components/common/Button";
import React, { useState } from "react";

interface Props {
  slotRecord: SlotAvailabilityRecord
  handleClick: (slot: Slot, forDate: string) => Promise<boolean>;
}

const SlotCard: React.FC<Props> = (props) => {
  const { handleClick, slotRecord } = props;
  const { forDate, slot } = slotRecord;

  const [isBooked, setIsBooked] = useState(slotRecord.isBooked);
  return (
    <div className="max-w-[160px] mt-4 cursor-pointer rounded-md">
      {/* prettier-ignore */}
      <Button disabled={isBooked} onClick={() => handleClick(slot, forDate).then((v) => { if (v === true) setIsBooked(true) })} rounded="rounded-lg" danger={isBooked} success={!isBooked} title={isBooked ? "Not Available" : `Book Slot for ${forDate}`}>
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
