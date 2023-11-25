"use client";

import React, { useEffect, useReducer } from "react";
import { useSession } from "next-auth/react";
import gzRequest from "@/lib/utils/gzRequest";
import SelectInput from "@/ui/components/form/SelectInput";
import BookingListHOC from "../BookingListHOC";
import BookingCard from "../bookingcard/BookingCard";
import TableFooter from "@/ui/components/table/TableFooter";

const Bookings = () => {
  const { data: session, status: authStatus } = useSession();

  const [state, dispatch] = useReducer(reducer, initialState);

  // prettier-ignore
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    event.preventDefault();
    dispatch({type: "SET_QUERY", queryPaylod: {...state.query, [event.target.name]: event.target.value }})
  };

  useEffect(() => {
    if (authStatus === "loading") return () => {};

    const timeOutId = setTimeout(() => {
      dispatch({ type: "LOADING", paylod: true });
    }, 150);

    dispatch({ type: "SET_MESSAGES", paylod: "" });

    fetchBookings(state.query, session?.auth?.token)
      .then((res: GZResponse<GZPage<Partial<Booking>>>) => {
        if (res.ok && res.result) {
          dispatch({ type: "SET_PAGE", pagePaylod: res.result });
        } else {
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

    return () => {};
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
          <div className="flex sm:flex-row flex-col justify-between items-center">
            <div className="my-2 flex sm:flex-row flex-col">
              <div className="flex flex-row mb-1 sm:mb-0">
                {/*  */}
                <SelectInput
                  lable="Limit"
                  name="limit"
                  value={state.query.limit}
                  options={limitOptions}
                  onChange={handleQueryChange}
                  rounded="rounded-l"
                />
                {/*  */}
                <SelectInput
                  lable="Sort"
                  name="sort"
                  value={state.query.sort}
                  options={sortOptions}
                  onChange={(e) => handleQueryChange(e)}
                  rounded=""
                />
              </div>
              {/*  */}
            </div>
          </div>
          {/* bookings */}
          <BookingListHOC loading={state.loading}>
            {state.page.content.map((booking, index) => {
              return <BookingCard key={index} booking={booking} />;
            })}
          </BookingListHOC>
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
    </>
  );
};

export default Bookings;

async function fetchBookings(
  query: BookingQuery,
  authToken?: string
): Promise<GZResponse<GZPage<Partial<Booking>>>> {
  return gzRequest<BookingQuery, null, GZPage<Partial<Booking>>>({
    requestMethod: "GET",
    requestQuery: query,
    requestUrl: "http://localhost:3333/api/booking/search",
    authToken: authToken,
  });
}

const limitOptions: { lable: string; value: any }[] = [
  {
    lable: "5",
    value: 5,
  },
  {
    lable: "10",
    value: 10,
  },
  {
    lable: "20",
    value: 20,
  },
];

const sortOptions: { lable: string; value: any }[] = [
  {
    lable: "ForDate - ASC",
    value: "forDate.asc",
  },
  {
    lable: "ForDate - DESC",
    value: "forDate.desc",
  },
];

interface ComponentState {
  messages: string;
  page: GZPage<Partial<Booking>>;
  query: BookingQuery;
  loading: boolean;
}

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
    forDate: "",
    limit: 5,
    include: "game,user,slot",
    pageNo: 0,
    sort: "forDate.asc",
  },
  loading: true,
};

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
      return {...state, messages: action?.paylod ?? ""};
    case "SET_PAGE": 
      if(action?.pagePaylod)
        return {...state, page: action?.pagePaylod};
      return state;
    case "UPDATE_BOOKING":
        return {...state, page: {...state.page, content:state.page.content.map((b) => (b.bookingId === action?.bookingPayload?.bookingId)&&action?.bookingPayload ? action.bookingPayload : b)}}
    case "SET_QUERY": 
      if(action?.queryPaylod) {
        const prevPage = state.query.pageNo;
        const pageNo = prevPage === action.queryPaylod.pageNo ? 0 : action.queryPaylod.pageNo
        return {...state,query: {...state.query, ...action.queryPaylod, pageNo}}
      }
      return state;
    case "NEXT_PAGE": 
      return {...state, query: {...state.query, pageNo: state.query.pageNo + 1}};
    case "PREV_PAGE": 
      return {...state, query: {...state.query, pageNo: state.query.pageNo - 1}};
    case "LOADING":
      return {...state, loading: action.paylod ?? false};
    default:
      return state;
  }
}
