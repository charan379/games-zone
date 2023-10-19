"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export const ThemeSwitcher: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className={`w-max px-2 rounded-md hover:scale-110 active:scale-100 duration-200 bg-gray-300 dark:bg-gray-950`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
};
