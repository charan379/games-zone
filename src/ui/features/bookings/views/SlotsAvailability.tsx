"use client";

import React, { useEffect, useReducer } from "react";
import { groupByInnerObjectField } from "@/lib/utils/groupBy";
import SlotCard from "../slotsavailability/SlotCard";
import SlotLocation from "../slotsavailability/SlotLocation";
import gzRequest from "@/lib/utils/gzRequest";
import { useSession } from "next-auth/react";
import DateInput from "@/ui/components/form/DateInput";
import convertToLocaleDate from "@/lib/utils/convertToLocaleDate";
import SlotLocationsHOC from "../slotsavailability/SlotLocationsHOC";

interface Props {
  gameId: number;
}
const SlotsAvailability: React.FC<Props> = (props) => {
  const { gameId } = props;

  const { data: session, status: authStatus } = useSession();

  const [state, dispatch] = useReducer(reducer, initialState);

  // prettier-ignore
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    event.preventDefault();
    dispatch({ type: "SET_QUERY", queryPaylod: { ...state.query, [event.target.name]: event.target.value } })
  };

  function bookSlot(slot: Slot, forDate: string): Promise<boolean> {
    // prettier-ignore
    return bookSlotRequest({ forDate: forDate, gameId: slot.gameId, slotId: slot.slotId, userId: session?.user.userId as number }, session?.auth?.token)
      .then((res: GZResponse<Booking>) => {
        if (res.ok && res.result) {
          return true
        } else {
          return false
        }
      }).catch(err => {
        return false;
      })
  }

  useEffect(() => {
    if (authStatus === "loading") return () => { };

    const timeOutId = setTimeout(() => {
      dispatch({ type: "LOADING", paylod: true });
    }, 150);

    dispatch({ type: "SET_MESSAGES", paylod: "" });

    // prettier-ignore
    fetchSlotAvailabilityRecords(state.query, gameId, session?.auth?.token)
      .then((res: GZResponse<SlotAvailabilityRecord[]>) => {
        if (res.ok && res.result) {
          dispatch({ type: "SET_SLOT_RECORD", slotsRecordPayload: groupByInnerObjectField(res.result, "slot.location") });
          if (res.result.length === 0)
            dispatch({ type: "SET_MESSAGES", paylod: "No Slots found for given query !" });
        } else {
          dispatch({ type: "SET_MESSAGES", paylod: res?.error?.errorMessage ?? "Somthing Went Wrong !" });
        }
      })
      .finally(() => {
        clearTimeout(timeOutId);
        setTimeout(() => {
          dispatch({ type: "LOADING", paylod: false });
        }, 150);
      });

    return () => { };
  }, [state.query, authStatus]);

  return (
    <div className="flex flex-col w-full">
      <div className="z-10 w-full items-center justify-center sm:justify-between font-mono text-sm flex flex-row flex-wrap gap-4">
        <p className="text-base left-0 top-0 flex w-full justify-center rounded-md border border-gray-300 bg-gray-200 py-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Showing Slots from game : {gameId}
        </p>
        <DateInput
          name="forDate"
          onChange={handleQueryChange}
          rounded="rounded-md"
          value={state.query.forDate}
          label="Booking For Date [Default: Current Date]"
        />
      </div>
      <SlotLocationsHOC isLoading={state.loading}>
        {Object.keys(state.slotsRecord).map((location, index) => {
          return (
            // prettier-ignore
            <SlotLocation location={location} key={index}>
              {Object.values(state.slotsRecord)[index]?.map((saRecord, sarindex) => {
                return (
                  <SlotCard handleClick={bookSlot} key={sarindex} slotRecord={saRecord}
                  />
                );
              })}
            </SlotLocation>
          );
        })}
        <span className="text-lg xs:text-base text-gray-900">
          {state.messages}
        </span>
      </SlotLocationsHOC>
    </div>
  );
};

export default SlotsAvailability;

// prettier-ignore
async function fetchSlotAvailabilityRecords(query: { forDate: string }, gameId: number, authToken?: string): Promise<GZResponse<SlotAvailabilityRecord[]>> {
  return gzRequest<{ forDate: string }, null, SlotAvailabilityRecord[]>({
    requestMethod: "GET",
    requestQuery: { ...query, forDate: convertToLocaleDate(query.forDate) },
    requestUrl: `http://localhost:3333/api/booking/game/${gameId}/slots/availability`,
    authToken: authToken,
  });
}

interface BookingReqBoby { forDate: string, slotId: number, gameId: number, userId: number };
async function bookSlotRequest(body: BookingReqBoby, authToken?: string) {
  return gzRequest<null, BookingReqBoby, Booking>({
    requestUrl: "http://localhost:3333/api/booking",
    requestMethod: "POST",
    requestBoby: body,
    authToken: authToken,
  })
}
interface StateAction {
  type: string;
  paylod?: any;
  slotsRecordPayload?: Record<string, SlotAvailabilityRecord[]>;
  queryPaylod?: { forDate: string };
}

interface ComponentState {
  messages: string;
  slotsRecord: Record<string, SlotAvailabilityRecord[]>;
  query: { forDate: string };
  loading: boolean;
}

const initialState: ComponentState = {
  messages: "",
  slotsRecord: {},
  query: { forDate: "today" },
  loading: true,
};

// prettier-ignore
function reducer(state: ComponentState, action: StateAction): ComponentState {
  switch (action.type) {
    case "SET_MESSAGES":
      return { ...state, messages: action?.paylod ?? "" };
    case "SET_SLOT_RECORD":
      if (action?.slotsRecordPayload)
        return { ...state, slotsRecord: action?.slotsRecordPayload };
      return state;
    case "SET_QUERY":
      if (action?.queryPaylod)
        return { ...state, query: { ...state.query, ...action.queryPaylod } }
      return state;
    case "LOADING":
      return { ...state, loading: action.paylod ?? false };
    default:
      return state;
  }
}
