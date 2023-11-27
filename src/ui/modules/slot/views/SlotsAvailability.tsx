"use client";

import React, { useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { groupByInnerObjectField } from "@/lib/utils/groupBy";
import SlotCard from "../components/SlotCard";
import SlotLocation from "../components/SlotLocation";
import gzRequest from "@/lib/utils/gzRequest";
import { useSession } from "next-auth/react";
import DateInput from "@/ui/components/form/DateInput";
import convertToLocaleDate from "@/lib/utils/convertToLocaleDate";
import SlotLocationsHOC from "../components/SlotLocationsHOC";
import InfoCard from "../../../components/common/InfoCard";
import ModalHOC from "@/ui/components/modal/ModalHOC";
import bookSlotRequest from "../requests/bookSlot";

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

  // prettier-ignore
  function bookSlot(slot: Slot, forDate: string): Promise<boolean> {
    dispatch({type: "INFO_MODAL",paylod: {message: `Submitting booking request...`,isLoading: true}});
    // prettier-ignore
    return bookSlotRequest({ forDate: forDate, gameId: slot.gameId, slotId: slot.slotId, userId: session?.user.userId as number }, session?.auth?.token)
      .then((res: GZResponse<Booking>) => {
        if (res.ok && res.result) {
          dispatch({ type: "INFO_MODAL", paylod: {message: `Successfully submitted with id : ${res.result.bookingId}`, isLoading: false} })
          return true
        } else {
          dispatch({ type: "INFO_MODAL", paylod: {message: res?.error?.errorMessage ?? "Somthing went wrong !", isLoading: false} })
          return false
        }
      }).catch(err => {
        dispatch({ type: "INFO_MODAL", paylod: {message: "Somthing went wrong !", isLoading: false} })
        return false;
      })
  }

  useEffect(() => {
    if (authStatus === "loading") return () => {};

    const timeOutId = setTimeout(() => {
      dispatch({ type: "LOADING", paylod: true });
    }, 10);

    dispatch({ type: "SET_MESSAGES", paylod: "" });

    // prettier-ignore
    fetchSlotAvailabilityRecords(state.query, gameId, session?.auth?.token)
      .then((res: GZResponse<SlotAvailabilityRecord[]>) => {
        if (res?.ok && res?.result) {
          dispatch({ type: "SET_SLOT_RECORD", slotsRecordPayload: groupByInnerObjectField(res.result, "slot.location") });
          if (res.result.length === 0) {
            dispatch({ type: "SET_SLOT_RECORD", slotsRecordPayload: {} });
            dispatch({ type: "SET_MESSAGES", paylod: "No Slots found for given query !" });
          }
        } else {
          dispatch({ type: "SET_SLOT_RECORD", slotsRecordPayload: {} });
          dispatch({ type: "SET_MESSAGES", paylod: res?.error?.errorMessage ?? "Somthing Went Wrong !" });
        }
      })
      .finally(() => {
        clearTimeout(timeOutId);
        setTimeout(() => {
          dispatch({ type: "LOADING", paylod: false });
        }, 150);
      });

    return () => {};
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
      <SlotLocationsHOC isLoading={state.loading} key={uuidv4()}>
        {Object.keys(state.slotsRecord).map((location, index) => {
          return (
            // prettier-ignore
            <SlotLocation location={location} key={uuidv4()}>
              {Object.values(state.slotsRecord)[index]?.map((saRecord) => {
                return (
                  <SlotCard handleClick={bookSlot} key={uuidv4()} slotRecord={saRecord}
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

      <ModalHOC key={"deleteGameModal"} show={state.modals.infoCard.show}>
        {/* prettier-ignore */}
        <InfoCard messages={state.modals.infoCard.messages} close={() => dispatch({ type: "CLOSE_MODALS" })} isLoading={state.modals.infoCard.isLoading} />
      </ModalHOC>
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

interface StateAction {
  type: string;
  paylod?: any;
  slotsRecordPayload?: Record<string, SlotAvailabilityRecord[]>;
  queryPaylod?: { forDate: string };
}

interface ComponentState {
  modals: {
    infoCard: { show: boolean; messages: string; isLoading: boolean };
  };
  messages: string;
  slotsRecord: Record<string, SlotAvailabilityRecord[]>;
  query: { forDate: string };
  loading: boolean;
}

const initialState: ComponentState = {
  modals: {
    infoCard: { show: false, messages: "", isLoading: false },
  },
  messages: "",
  slotsRecord: {},
  query: { forDate: "today" },
  loading: true,
};

// prettier-ignore
function reducer(state: ComponentState, action: StateAction): ComponentState {
  switch (action.type) {
    case "INFO_MODAL":
      return { ...state, modals: { ...state.modals, infoCard: { show: true, messages: action?.paylod?.message, isLoading:action?.paylod?.isLoading  } } };
    case "CLOSE_MODALS":
      return { ...state, modals: { ...state.modals, infoCard: { show: false, messages: "", isLoading: false } } };
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
