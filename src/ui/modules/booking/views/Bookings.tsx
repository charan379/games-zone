"use client";

import React, { useEffect, useReducer } from "react";
import { useSession } from "next-auth/react";
import SelectInput from "@/ui/components/form/SelectInput";
import BookingListHOC from "../components/BookingListHOC";
import BookingCard from "../components/booking-card/BookingCard";
import TableFooter from "@/ui/components/table/TableFooter";
import CheckboxGroup from "@/ui/components/form/CheckboxGroup";
import DateInput from "@/ui/components/form/DateInput";
import TextInput from "@/ui/components/form/TextInput";
import fetchBookings from "../requests/fetchBookings";
import { v4 as uuid4 } from 'uuid';

interface Props {
  view: "ADMIN" | "USER";
}

const Bookings: React.FC<Props> = ({ view }) => {
  const { data: session, status: authStatus } = useSession();

  const initialState: ComponentState = {
    messages: "",
    page: {
      content: [],
      last: true,
      totalPages: 0,
      totalElements: 0,
      size: 1,
      number: 0,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false,
      },
      numberOfElements: 0,
      first: true,
      empty: true,
    },
    query: {
      userId:
        view === "USER" && session?.user?.userId?.toString()
          ? session?.user?.userId?.toString()
          : "",
      gameId: "",
      status: "",
      forDate: "",
      limit: 5,
      include: "game,user,slot",
      pageNo: 0,
      sort: "for_date.asc",
    },
    loading: true,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // prettier-ignore
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    event.preventDefault();
    dispatch({ type: "SET_QUERY", queryPaylod: { ...state.query, [event.target.name]: event.target.value } })
  };

  // prettier-ignore
  const handleIncludesChange = (obj: object) => {
    dispatch({
      type: "SET_QUERY", queryPaylod: {
        ...state.query, include: Object.entries(obj).map(([value, isChecked]) => {
          if (isChecked) return value;
        }).join(",")
      }
    })

  };

  const updateBooking = (b: Partial<Booking>) => {
    dispatch({ type: "UPDATE_BOOKING", bookingPayload: b });
  };

  useEffect(() => {
    if (authStatus === "loading") return () => { };

    const timeOutId = setTimeout(() => {
      dispatch({ type: "LOADING", paylod: true });
    }, 150);

    dispatch({ type: "SET_MESSAGES", paylod: "" });

    fetchBookings(state.query, session?.auth?.token)
      .then((res: GZResponse<GZPage<Partial<Booking>>>) => {
        if (res.ok && res.result) {
          dispatch({ type: "SET_PAGE", pagePaylod: res.result });
        } else {
          dispatch({ type: "SET_PAGE", pagePaylod: initialState.page });
          dispatch({
            type: "SET_MESSAGES",
            paylod: res?.error?.errorMessage ?? "Somthing Went Wrong !",
          });
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
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-1 text-center">
          <div>
            <h2 className="text-2xl font-semibold leading-tight text-left">
              Bookings
            </h2>
          </div>
          <div className="flex  flex-col md:flex-row justify-between items-center gap-4">
            <div className="my-2 flex sm:flex-row flex-col items-center">
              <div className="flex flex-col md:flex-row mb-1 sm:mb-0">
                {/*  */}
                <SelectInput
                  label="Limit"
                  name="limit"
                  value={state.query.limit}
                  options={limitOptions}
                  onChange={handleQueryChange}
                  rounded="rounded-l"
                />
                {/*  */}
                <SelectInput
                  label="Sort"
                  name="sort"
                  value={state.query.sort}
                  options={sortOptions}
                  onChange={(e) => handleQueryChange(e)}
                  rounded=""
                />
                <SelectInput
                  label="Status"
                  name="status"
                  value={state.query.status}
                  options={statusOptions}
                  onChange={handleQueryChange}
                  rounded="rounded-none"
                />
                <DateInput
                  name={"forDate"}
                  value={state.query.forDate}
                  onChange={handleQueryChange}
                  rounded={"rounded-none"}
                />
                {view === "ADMIN" && (
                  <TextInput
                    name="userId"
                    onChange={handleQueryChange}
                    rounded="rounded-none"
                    type="Search"
                    placeholder="User ID"
                    value={state.query.userId}
                    key={uuid4()}
                  />
                )}
                <TextInput
                  name="gameId"
                  onChange={handleQueryChange}
                  rounded="rounded-r"
                  type="Search"
                  placeholder="Game ID"
                  value={state.query.gameId}
                  key={uuid4()}
                />
              </div>
              {/*  */}
            </div>
            {view === "ADMIN" && (
              <CheckboxGroup
                label="Include Details Of"
                onChange={handleIncludesChange}
                options={includeOptions}
                rounded="rounded-md"
                initialState={{ slot: true, user: true, game: true }}
              />
            )}
          </div>
          {/* bookings */}
          <BookingListHOC loading={state.loading}>
            {state.page.content.map((booking) => {
              return (
                <BookingCard
                  key={uuid4()}
                  view={view}
                  booking={booking}
                  updateBooking={updateBooking}
                  authToken={session?.auth?.token}
                />
              );
            })}
          </BookingListHOC>
          <div className="w-full max-w-4xl relative mx-auto text-center mt-4 inline-block shadow rounded-lg overflow-hidden">
            <TableFooter
              messages={state.messages}
              nextPage={() => dispatch({ type: "NEXT_PAGE" })}
              prevPage={() => dispatch({ type: "PREV_PAGE" })}
              entriesCountProps={{
                pageNumber: state.page.number,
                pageSize: state.page.size,
                tableName: "Bookings",
                totalElements: state.page.totalElements,
              }}
              isFirstPage={state.page.first}
              isLastPage={state.page.last}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookings;

const limitOptions: { label: string; value: any }[] = [
  {
    label: "5",
    value: 5,
  },
  {
    label: "10",
    value: 10,
  },
  {
    label: "20",
    value: 20,
  },
];

const statusOptions: { label: string; value: any }[] = [
  {
    label: "Status - Any",
    value: "",
  },
  {
    label: "Requested",
    value: "REQUESTED",
  },
  {
    label: "Approved",
    value: "APPROVED",
  },
  {
    label: "Cancelled",
    value: "CANCELLED",
  },
  {
    label: "Rejected",
    value: "REJECTED",
  },
];

const sortOptions: { label: string; value: any }[] = [
  {
    label: "ForDate - ASC",
    value: "for_date.asc",
  },
  {
    label: "ForDate - DESC",
    value: "for_date.desc",
  },
  {
    label: "TransactionDate - ASC",
    value: "transaction_date.asc",
  },
  {
    label: "TransactionDate - DESC",
    value: "transaction_date.desc",
  },
  {
    label: "Booking Id - ASC",
    value: "booking_id.asc",
  },
  {
    label: "Booking Id - DESC",
    value: "booking_id.desc",
  },
];

const includeOptions: { label: string; value: string }[] = [
  { label: "Slot Details", value: "slot" },
  { label: "User Details", value: "user" },
  { label: "Game Details", value: "game" },
];
interface ComponentState {
  messages: string;
  page: GZPage<Partial<Booking>>;
  query: BookingQuery;
  loading: boolean;
}

interface StateAction {
  type: string;
  paylod?: any;
  pagePaylod?: GZPage<Partial<Booking>>;
  queryPaylod?: BookingQuery;
  bookingPayload?: Partial<Booking>;
}

// prettier-ignore
function reducer(state: ComponentState, action: StateAction): ComponentState {
  switch (action.type) {
    case "SET_MESSAGES":
      return { ...state, messages: action?.paylod ?? "" };
    case "SET_PAGE":
      if (action?.pagePaylod)
        return { ...state, page: action?.pagePaylod };
      return state;
    case "UPDATE_BOOKING":
      return { ...state, page: { ...state.page, content: state.page.content.map((b) => (b.bookingId === action?.bookingPayload?.bookingId) && action?.bookingPayload ? { ...b, ...action.bookingPayload } : b) } }
    case "SET_QUERY":
      if (action?.queryPaylod) {
        const prevPage = state.query.pageNo;
        const pageNo = prevPage === action.queryPaylod.pageNo ? 0 : action.queryPaylod.pageNo
        return { ...state, query: { ...state.query, ...action.queryPaylod, pageNo } }
      }
      return state;
    case "NEXT_PAGE":
      return { ...state, query: { ...state.query, pageNo: state.query.pageNo + 1 } };
    case "PREV_PAGE":
      return { ...state, query: { ...state.query, pageNo: state.query.pageNo - 1 } };
    case "LOADING":
      return { ...state, loading: action.paylod ?? false };
    default:
      return state;
  }
}
