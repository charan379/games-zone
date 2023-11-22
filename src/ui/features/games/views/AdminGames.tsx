"use client";

import React, { useEffect, useState } from "react";
import DownArrow from "../../../components/common/DownArrow";
import SearchIcon from "../../../components/common/SearchIcon";
import TableHeader from "../../../components/common/table/TableHeader";
import TableRow from "../../../components/common/table/TableRow";
import TableData from "../../../components/common/table/TableData";
import Modal from "../../../components/Modal/Modal";
import AddGame from "@/ui/features/games/Forms/AddGame";
import { useSession } from "next-auth/react";

const AdminGames = () => {
  const { data: session, status: authStatus } = useSession();

  const [modalData, SetModalData] = useState({
    addGameModal: { show: false },
  });

  const [messages, setMessages] = useState("");

  const [pageData, setPageData] = useState({
    content: [{ gameId: 0, gameName: "", image: "" }],
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
  });

  const handleQueryChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    event.preventDefault();
    setFetchQuery({ ...fetchQuery, [event.target.name]: event.target.value });
  };

  const [fetchQuery, setFetchQuery] = useState({
    query: "",
    limit: 5,
    include: "",
    pageNo: 0,
    sort: "",
  });

  useEffect(() => {
    setMessages("");

    if (authStatus === "loading") return () => {};

    fetch(
      `http://localhost:3333/api/game/search?limit=${fetchQuery.limit}&include=${fetchQuery.include}&query=${fetchQuery.query}&pageNo=${fetchQuery.pageNo}&sort=${fetchQuery.sort}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.auth?.token}`,
        },
      }
    )
      .then(async (res) => {
        if (res.ok) {
          setPageData(await res.json());
          console.log(pageData);
        } else {
          const error = await res.json();
          setMessages(error?.errorMessage);
        }
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {});

    return () => {};
  }, [
    fetchQuery.include,
    fetchQuery.limit,
    fetchQuery.pageNo,
    fetchQuery.query,
    authStatus,
  ]);

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-1">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Games</h2>
          </div>
          <div className="flex sm:flex-row flex-col justify-between items-center">
            <div className="my-2 flex sm:flex-row flex-col">
              <div className="flex flex-row mb-1 sm:mb-0">
                <div className="relative">
                  <select
                    name="limit"
                    value={fetchQuery.limit}
                    onChange={(e) => handleQueryChange(e)}
                    className="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                  <DownArrow />
                </div>
                <div className="relative">
                  <select
                    name="sort"
                    value={fetchQuery.sort}
                    onChange={(e) => handleQueryChange(e)}
                    className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                  >
                    <option value={"id.asc"}>ID - ASC</option>
                    <option value={"id.desc"}>ID - DESC</option>
                    <option value={"name.asc"}>NAME - ASC</option>
                    <option value={"name.desc"}>NAME - DESC</option>
                  </select>
                  <DownArrow />
                </div>
              </div>
              <div className="block relative">
                <SearchIcon />
                <input
                  name="query"
                  value={fetchQuery.query}
                  onChange={(e) => handleQueryChange(e)}
                  placeholder="Search"
                  className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={() =>
                SetModalData({
                  ...modalData,
                  addGameModal: { ...modalData.addGameModal, show: true },
                })
              }
              className="mt-4 font-semibold bg-slate-500 text-white py-2 px-6 rounded-md hover:bg-purple-600"
            >
              New Game +
            </button>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              {messages ? (
                <p>{messages}</p>
              ) : (
                <table className="min-w-full leading-normal">
                  <TableHeader rows={["id", "name", "slots", "actions"]} />
                  <tbody>
                    {pageData.content.map((game, index) => {
                      return (
                        <TableRow key={index}>
                          <TableData key={1}>
                            <p className="text-gray-900 whitespace-no-wrap">
                              {game?.gameId ?? ""}
                            </p>
                          </TableData>
                          <TableData key={2}>
                            <p className="text-gray-900 whitespace-no-wrap">
                              {game?.gameName ?? ""}
                            </p>
                          </TableData>
                          <TableData key={3}>
                            <p className="text-gray-900 whitespace-no-wrap">
                              Open Slots
                            </p>
                          </TableData>
                          <TableData key={4}>
                            <p className="text-gray-900 whitespace-no-wrap">
                              Actions
                            </p>
                          </TableData>
                        </TableRow>
                      );
                    })}
                  </tbody>
                </table>
              )}
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <span className="text-xs xs:text-sm text-gray-900">
                  Showing {pageData.number * pageData.size + 1} to{" "}
                  {Math.min(
                    (pageData.number + 1) * pageData.size,
                    pageData.totalElements
                  )}{" "}
                  of {pageData.totalElements} Games
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button
                    disabled={pageData.first}
                    onClick={() =>
                      setFetchQuery({
                        ...fetchQuery,
                        pageNo: pageData.number - 1,
                      })
                    }
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                  >
                    Prev
                  </button>
                  <button
                    disabled={pageData.last}
                    onClick={() =>
                      setFetchQuery({
                        ...fetchQuery,
                        pageNo: pageData.number + 1,
                      })
                    }
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal */}

      <Modal key={"addGameModal"} show={modalData.addGameModal.show}>
        <AddGame
          close={() =>
            SetModalData({
              ...modalData,
              addGameModal: { ...modalData.addGameModal, show: false },
            })
          }
        />
      </Modal>
    </>
  );
};

export default AdminGames;
