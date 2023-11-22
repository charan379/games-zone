"use client";

import { useSession } from 'next-auth/react';
import React, { useState } from 'react'

interface Props {
    close: () => void;
}

const AddGame: React.FC<Props> = (props) => {

    const { close } = props;

    const { data: session, status: authStatus } = useSession();

    const [gameName, setGameName] = useState("");

    const [messages, setMessages] = useState("");

    const handleSubmit = (event: React.FormEvent) => {

        event.preventDefault();
        setMessages("");

        fetch("http://localhost:3333/api/game/add", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${session?.auth?.token}`
            },
            body: JSON.stringify({
                "gameName": gameName,
                "image": ""
            })
        }).then(async (res) => {

            if (res.status === 201) {
                setMessages(JSON.stringify(await res.json()))
            } else {
                const error = await res.json();
                setMessages(error?.errorMessage)
            }
        }).catch(err => {
            throw err;
        }).finally(() => {

        })


    }

    return (
        <div className="relative py-5 sm:w-96 mx-auto text-center">
            <span className="text-2xl font-bold">Add New Game</span>
            <div className="mt-4 bg-white shadow-md rounded-lg text-left">
                <div className="h-2 bg-slate-400 rounded-t-md"></div>
                <form className="px-8 py-6" onSubmit={handleSubmit}>
                    <label className="block font-semibold"> Game Name </label>
                    <input
                        type="text"
                        name='gameName'
                        placeholder="Game Name"
                        value={gameName}
                        onChange={(e) => setGameName(e.target.value)}
                        required={true}
                        className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                    <div className="flex justify-between items-baseline">
                        <button
                            type="submit"
                            className="mt-4 bg-slate-500 text-white py-2 px-6 rounded-md hover:bg-purple-600">
                            Submit
                        </button>
                        <button
                            type='button'
                            onClick={close}
                            className="mt-4 bg-red-400 text-white py-2 px-6 rounded-md hover:bg-purple-600 ">
                            Cancel
                        </button>
                    </div>
                </form>
                <div className='text-sm'>
                    {messages}
                </div>
            </div>
        </div>
    )
}

export default AddGame