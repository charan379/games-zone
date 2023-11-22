'use client';

import React, { useState } from 'react'
import DownArrow from '../../common/DownArrow';
import SearchIcon from '../../common/SearchIcon';
import TableHeader from '../../common/table/TableHeader';
import TableRow from '../../common/table/TableRow';
import TableData from '../../common/table/TableData';
import Modal from '../../Modal/Modal';
import AddGame from '@/ui/features/games/Forms/AddGame';

const AdminGames = () => {

    const [modalData, SetModalData] = useState({
        addGameModal: { show: false }
    })
    return (
        <>
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-1">
                    <div>
                        <h2 className="text-2xl font-semibold leading-tight">Games</h2>
                    </div>
                    <div className='flex sm:flex-row flex-col justify-between items-center'>
                        <div className="my-2 flex sm:flex-row flex-col">
                            <div className="flex flex-row mb-1 sm:mb-0">
                                <div className="relative">
                                    <select
                                        className="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                        <option>5</option>
                                        <option>10</option>
                                        <option>20</option>
                                    </select>
                                    <DownArrow />
                                </div>
                                <div className="relative">
                                    <select
                                        className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                                        <option>All</option>
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                    <DownArrow />
                                </div>
                            </div>
                            <div className="block relative">
                                <SearchIcon />
                                <input placeholder="Search"
                                    className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                            </div>
                        </div>

                        <button
                            onClick={() => SetModalData({ ...modalData, addGameModal: { ...modalData.addGameModal, show: true } })}
                            className='mt-4 font-semibold bg-slate-500 text-white py-2 px-6 rounded-md hover:bg-purple-600'>
                            New Game +
                        </button>

                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <TableHeader rows={["id", "name", "slots", "actions"]} />
                                <tbody>
                                    {[1, 2, 3, 4].map((e, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableData key={1}>
                                                    <p className="text-gray-900 whitespace-no-wrap">1001</p>
                                                </TableData>
                                                <TableData key={2}>
                                                    <p className="text-gray-900 whitespace-no-wrap">Cricket</p>
                                                </TableData>
                                                <TableData key={3}>
                                                    <p className="text-gray-900 whitespace-no-wrap">3</p>
                                                </TableData>
                                                <TableData key={4}>
                                                    <p className="text-gray-900 whitespace-no-wrap">Actions</p>
                                                </TableData>
                                            </TableRow>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div
                                className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                                <span className="text-xs xs:text-sm text-gray-900">
                                    Showing 1 to 4 of 50 Entries
                                </span>
                                <div className="inline-flex mt-2 xs:mt-0">
                                    <button
                                        className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                                        Prev
                                    </button>
                                    <button
                                        className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* modal */}

            <Modal key={'addGameModal'} show={modalData.addGameModal.show}>
                <AddGame close={() => SetModalData({ ...modalData, addGameModal: { ...modalData.addGameModal, show: false } })} />
            </Modal>
        </>
    )
}

export default AdminGames;