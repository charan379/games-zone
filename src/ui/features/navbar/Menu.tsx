'use client';

import React from "react";
import MenuItem from "../../components/navbar/MenuItem";
import dynamic from "next/dynamic";
import Link from "next/link";
import { signOut, useSession } from 'next-auth/react';

// const ThemeSwitcher = dynamic(() => import("@/ui/features/theme/ThemeSwitcher").then(module => module.ThemeSwitcher), {
//   loading: () => <>Theme</>,
//   ssr: false,
// })

const Menu = () => {
  const links = [
    { label: "Home", href: process.env.NEXT_PUBLIC_BASE_URL as string },
    { label: "Link 2", href: "#" },
    { label: "Link 4", href: "#" },
    { label: "Link 4", href: "#" },
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

      {/* auth options */}
      {
        authStatus === 'authenticated' ?
          <li key={links.length + 2}>
            <button onClick={() => signOut()}>Sign Out</button>
          </li>
          :
          <li key={links.length + 1}>
            <Link href={"/login"}>Sign In</Link>
          </li>
      }


    </ul>
  );
};

export default Menu;
