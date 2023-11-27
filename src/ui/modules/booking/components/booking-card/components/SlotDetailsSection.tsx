import React from "react";
import KeyValuePair from "./KeyValuePair";
import convertTo12HourFormat from "@/lib/utils/convertTo12HrFormat";

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
          key={1}
        >
          <KeyValuePair label="Game" value={game?.gameName} key={2} />
          {view === "ADMIN" && (
            <KeyValuePair
              label="Game ID"
              value={game?.gameId?.toString()}
              key={1}
            />
          )}
        </div>
      )}
      {slot && (
        <>
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-10"
            key={2}
          >
            <KeyValuePair label="Slot" value={slot?.slotName} key={4} />
            {view === "ADMIN" && (
              <KeyValuePair
                label="Slot ID"
                value={slot?.slotId?.toString()}
                key={3}
              />
            )}
          </div>
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-1 sm:gap-10"
            key={3}
          >
            <KeyValuePair
              label="Start Time"
              value={convertTo12HourFormat(slot?.startTime)}
              key={3}
            />
            <KeyValuePair
              label="End Time"
              value={convertTo12HourFormat(slot?.endTime)}
              key={4}
            />
          </div>
          <KeyValuePair label="Location" value={slot?.location} key={3} />
        </>
      )}
    </>
  );
};

export default SlotDetailsSection;
