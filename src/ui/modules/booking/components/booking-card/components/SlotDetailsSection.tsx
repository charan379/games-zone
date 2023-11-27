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
          key={`${slot.slotId}-div-1`}
        >
          <KeyValuePair label="Game" value={game?.gameName} key={"gName"} />
          {view === "ADMIN" && (
            <KeyValuePair
              label="Game ID"
              value={game?.gameId?.toString()}
              key={"gId"}
            />
          )}
        </div>
      )}
      {slot && (
        <>
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-10"
            key={`${slot.slotId}-div-2`}
          >
            <KeyValuePair label="Slot" value={slot?.slotName} key={4} />
            {view === "ADMIN" && (
              <KeyValuePair
                label="Slot ID"
                value={slot?.slotId?.toString()}
                key={"sId"}
              />
            )}
          </div>
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-1 sm:gap-10"
            key={`${slot.slotId}-div-3`}
          >
            <KeyValuePair
              label="Start Time"
              value={convertTo12HourFormat(slot?.startTime)}
              key={`sSt`}
            />
            <KeyValuePair
              label="End Time"
              value={convertTo12HourFormat(slot?.endTime)}
              key={"sEt"}
            />
          </div>
          <KeyValuePair label="Location" value={slot?.location} key={"sLc"} />
        </>
      )}
    </>
  );
};

export default SlotDetailsSection;
