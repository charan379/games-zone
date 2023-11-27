"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useReducer } from "react";
import SearchForm from "../components/GameSearchFrom";
import GameCard from "@/ui/modules/game/components/GameCard";
import fetchGames from "../requests/fetchGames";

const UserGames = () => {
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

    fetchGames(state.query, session?.auth?.token)
      .then((res: GZResponse<GZPage<Game>>) => {
        if (res.ok && res.result) {
          dispatch({ type: "SET_GAMES", gamesPayload: res.result.content });
          if (res.result.content.length === 0)
            dispatch({
              type: "SET_MESSAGES",
              paylod: "No games found for given query !",
            });
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
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="text-base left-0 top-0 flex w-full justify-center rounded-md border border-gray-300 bg-gray-200 py-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Book Your Slot for below games
        </p>
        <SearchForm changeHandler={handleQueryChange} gameQuery={state.query} />
      </div>
      <div className="w-full mt-5 flex flex-row flex-wrap gap-7 items-center justify-center md:justify-start py-5 overflow-hidden">
        {state.games.map((game, index) => {
          return <GameCard key={index} game={game} id={game.gameId} />;
        })}
      </div>
      <span className="text-lg xs:text-base text-gray-900">
        {state.messages}
      </span>
    </>
  );
};

export default UserGames;

interface StateAction {
  type: string;
  paylod?: any;
  gamesPayload?: Game[];
  queryPaylod?: GameQuery;
}

interface ComponentState {
  messages: string;
  games: Game[];
  query: GameQuery;
  loading: boolean;
}

const initialState: ComponentState = {
  messages: "",
  games: [],
  query: {
    query: "",
    limit: 100,
    include: "",
    pageNo: 0,
    sort: "gameName.asc",
  },
  loading: true,
};

// prettier-ignore
function reducer(state: ComponentState, action: StateAction): ComponentState {
    switch (action.type) {
      case "SET_MESSAGES": 
        return {...state, messages: action?.paylod ?? ""};
      case "SET_GAMES": 
        if(action?.gamesPayload)
          return {...state, games: action?.gamesPayload};
        return state;
      case "SET_QUERY": 
        if(action?.queryPaylod)
          return {...state,query: {...state.query, ...action.queryPaylod}}
        return state;
      case "LOADING":
        return {...state, loading: action.paylod ?? false};
      default:
        return state;
    }
  }
