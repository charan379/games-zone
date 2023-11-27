"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import ModalLayout from "@/ui/components/Modal/ModalLayout";
import Button from "@/ui/components/common/Button";

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [errors, setErrors] = useState("");

  const router = useRouter();

  const searchParams = useSearchParams();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (errors) setErrors("");

    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    if (errors) setErrors("");

    try {
      const response = await signIn("credentials", {
        ...credentials,
        redirect: false,
      });

      if (response?.ok) {
        if (searchParams.has("callbackUrl")) {
          router.push(searchParams.get("callbackUrl") as string);
        }
        return;
      }

      if (response?.error) {
        try {
          setErrors(JSON.parse(response?.error)?.errorMessage);
        } catch (error) {
          setErrors("Somthing went wrong !");
        }
        return;
      }
    } catch (error) {
      setErrors("Somthing went wrong !");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 50);
    }
  };

  return (
    <div className="relative flex min-h-screen lg:min-h-max text-gray-800 antialiased flex-col justify-center overflow-hidden py-6 sm:py-12">
      <ModalLayout
        label={`${searchParams?.get("message") ?? "Login to your account !"}`}
      >
        <form className="px-8 py-6 " onSubmit={handleSubmit}>
          <label className="block font-semibold"> Username </label>
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={credentials.userName}
            onChange={handleOnChange}
            required={true}
            className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
          />
          <label className="block mt-3 font-semibold"> Password </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleOnChange}
            required={true}
            className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
          />
          <div className="flex justify-between items-baseline">
            <Button
              type="submit"
              rounded="rounded-md"
              classsName="mt-4 bg-slate-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-purple-600"
              isLoading={isLoading}
            >
              Login
            </Button>
            {/* <a href="#" className="text-sm hover:underline">Forgot password?</a> */}
          </div>
        </form>
        <div className="text-sm">{errors}</div>
      </ModalLayout>
    </div>
  );
};

export default Login;
