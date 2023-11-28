"use client";

import React from "react";
import MenuItem from "./components/MenuItem";
import { signOut, useSession } from "next-auth/react";
import { v4 as uuid4 } from 'uuid';

const Menu = () => {
  const links = [
    { label: "Home", href: process.env.NEXT_PUBLIC_BASE_URL as string },
    { label: "Book Slot", href: "/games" },
    { label: "My Bookings", href: "/bookings" },
  ];

  const { data: session, status: authStatus } = useSession();


  if (authStatus === "authenticated") {
    return (
      <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
        {links.map((link) => {
          return (
            <li key={uuid4()}>
              <MenuItem {...link} />
            </li>
          );
        })}

        {/* admin */}
        {session.user.roles.includes("ROLE_ADMIN") ? (
          <>
            <li key={uuid4()}>
              <MenuItem href="/admin" label="Admin Dashboard" />
            </li>
          </>
        ) : (
          ""
        )}
        {/* auth options */}
        <li key={uuid4()}>
          <MenuItem>
            <button onClick={() => signOut()}>Sign Out</button>
          </MenuItem>
        </li>
      </ul>
    )
  }

  return (
    <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
      <li key={uuid4()}>
        <MenuItem href="/login" label="Sign In" />
      </li>
    </ul>
  )

};

export default Menu;
