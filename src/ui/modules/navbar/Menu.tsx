"use client";

import React from "react";
import MenuItem from "./components/MenuItem";
import { signOut, useSession } from "next-auth/react";

const Menu = () => {
  const links = [
    { label: "Home", href: process.env.NEXT_PUBLIC_BASE_URL as string },
    { label: "Book Slot", href: "/games" },
    { label: "My Bookings", href: "/bookings" },
  ];

  const { data: session, status: authStatus } = useSession();

  return (
    <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
      {links.map((link, index) => {
        return (
          <li key={index}>
            <MenuItem {...link} />
          </li>
        );
      })}

      {/* admin */}
      {authStatus === "authenticated" &&
      session.user.roles.includes("ROLE_ADMIN") ? (
        <>
          <li key={links.length + 3}>
            <MenuItem href="/admin" label="Admin Dashboard" />
          </li>
        </>
      ) : (
        ""
      )}
      {/* auth options */}
      {authStatus === "authenticated" ? (
        <li key={links.length + 2}>
          <MenuItem>
            <button onClick={() => signOut()}>Sign Out</button>
          </MenuItem>
        </li>
      ) : (
        <li key={links.length + 1}>
          <MenuItem href="/login" label="Sign In" />
        </li>
      )}
    </ul>
  );
};

export default Menu;
