// app/components/ThemeSwitcher.tsx
"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="theme-switcher"> {/* Add a class for styling */}
      <button
  onClick={toggleTheme}
  aria-label="Toggle theme"
  className="flex items-center px-4 py-2 w-full focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700"
>
  {theme === "light" ? (
    <>
      <Moon size={24} className="mr-2" />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Dark Theme</span>
    </>
  ) : (
    <>
      <Sun size={24} className="mr-2" />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Light Theme</span>
    </>
  )}
</button>
    </div>
  );
}


