import React from "react";

export const Logo = () => {
  return (
    <a href="#" className="flex items-center">
      <img
        src="http://localhost:3000/favicon.ico"
        className="h-8 mr-3"
        alt="Flowbite Logo"
      />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        Games Zone
      </span>
    </a>
  );
};
