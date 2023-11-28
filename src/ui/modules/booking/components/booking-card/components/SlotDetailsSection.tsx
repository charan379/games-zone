import React from "react";
import KeyValuePair from "./KeyValuePair";
import convertTo12HourFormat from "@/lib/utils/convertTo12HrFormat";
import { v4 as uuid4 } from 'uuid';

interface Props {
  game: Partial<Game>;
  slot: Slot;
  view: "ADMIN" | "USER";
}

const SlotDetailsSection: React.FC<Props> = (props) => {
  const { game, slot, view } = props;
  return (
    <>
      {game && (
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-10"
          key={uuid4()}
        >
          <KeyValuePair label="Game" value={game?.gameName} key={uuid4()} />
          {view === "ADMIN" && (
            <KeyValuePair
              label="Game ID"
              value={game?.gameId?.toString()}
              key={uuid4()}
            />
          )}
        </div>
      )}
      {slot && (
        <>
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-10"
            key={uuid4()}
          >
            <KeyValuePair label="Slot" value={slot?.slotName} key={uuid4()} />
            {view === "ADMIN" && (
              <KeyValuePair
                label="Slot ID"
                value={slot?.slotId?.toString()}
                key={uuid4()}
              />
            )}
          </div>
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-1 sm:gap-10"
            key={uuid4()}
          >
            <KeyValuePair
              label="Start Time"
              value={convertTo12HourFormat(slot?.startTime)}
              key={uuid4()}
            />
            <KeyValuePair
              label="End Time"
              value={convertTo12HourFormat(slot?.endTime)}
              key={uuid4()}
            />
          </div>
          <KeyValuePair label="Location" value={slot?.location} key={uuid4()} />
        </>
      )}
    </>
  );
};

export default SlotDetailsSection;
