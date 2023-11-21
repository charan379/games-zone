"use client";

import React, { useState } from 'react'
import { signIn } from "next-auth/react"

const Login: React.FC = () => {

    const [credentials, setCredentials] = useState({ userName: "", password: "" });

    const [errors, setErrors] = useState("");

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        if (errors)
            setErrors("")

        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (errors)
            setErrors("")

        try {
            const response = await signIn("credentials", {
                ...credentials,
                redirect: false
            })

            if (response?.ok) {
                return;
            }

            if (response?.error) {
                console.log(response.error)
                return;
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="relative flex min-h-screen lg:min-h-max text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
                <div className="relative py-3 sm:w-96 mx-auto text-center">
                    <span className="text-2xl font-light ">Login to your account</span>
                    <div className="mt-4 bg-white shadow-md rounded-lg text-left">
                        <div className="h-2 bg-slate-400 rounded-t-md"></div>
                        <form className="px-8 py-6 " onSubmit={handleSubmit}>
                            <label className="block font-semibold"> Username </label>
                            <input
                                type="text"
                                name='userName'
                                placeholder="Username"
                                value={credentials.userName}
                                onChange={handleOnChange}
                                required={true}
                                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                            <label className="block mt-3 font-semibold"> Password </label>
                            <input
                                type="password"
                                name='password'
                                placeholder="Password"
                                value={credentials.password}
                                onChange={handleOnChange}
                                required={true}
                                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                            <div className="flex justify-between items-baseline">
                                <button
                                    type="submit"
                                    className="mt-4 bg-slate-500 text-white py-2 px-6 rounded-md hover:bg-purple-600 ">Login</button>
                                {/* <a href="#" className="text-sm hover:underline">Forgot password?</a> */}
                            </div>
                        </form>
                        <div className='text-sm'>
                            {errors}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login