import React from "react";
import MenuItem from "./MenuItem";
import dynamic from "next/dynamic";

const ThemeSwitcher = dynamic(()=> import("@/ui/features/theme/ThemeSwitcher").then(module => module.ThemeSwitcher), {
    loading: () => <>Theme</>,
    ssr:false,
})

const Menu = () => {
  const links = [
    { label: "Link 1" },
    { label: "Link 2" },
    { label: "Link 4" },
    { label: "Link 4" },
  ];
  return (
    <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
      {links.map((link, index) => {
        return (
          <li key={index}>
            <MenuItem {...link} />
          </li>
        );
      })}
      <li className="pl-2 md:pl-0">
        <ThemeSwitcher />
      </li>
    </ul>
  );
};

export default Menu;
