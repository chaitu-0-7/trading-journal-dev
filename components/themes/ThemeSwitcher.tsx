// app/components/ThemeSwitcher.tsx
"use client";

// import { useEffect, useState } from "react";
// import { useTheme } from "next-themes";
// import { Sun, Moon } from "lucide-react";

// export function ThemeSwitcher() {
//   const [mounted, setMounted] = useState(false);
//   const { theme, setTheme } = useTheme();

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   return (
//     <div className="theme-switcher"> {/* Add a class for styling */}
//       <button
//   onClick={toggleTheme}
//   aria-label="Toggle theme"
//   className="flex items-center px-4 py-2 w-full focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700"
// >
//   {theme === "light" ? (
//     <>
//       <Moon size={24} className="mr-2" />
//       <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Dark Theme</span>
//     </>
//   ) : (
//     <>
//       <Sun size={24} className="mr-2" />
//       <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Light Theme</span>
//     </>
//   )}
// </button>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { Monitor } from "lucide-react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    const preferredTheme = localStorage.getItem("preferredTheme");
    if (preferredTheme) {
      setTheme(preferredTheme);
    }
  }, [setTheme]);

  if (!mounted) return null;

  const toggleTheme = (newTheme : string) => {
    setTheme(newTheme);
    localStorage.setItem("preferredTheme", newTheme); // Optional: Store preference
  };

  return (
    <div className="theme-switcher flex items-center h-10 justify-center">
      {/* <span className="text-sm font-medium mr-2">Theme:</span> */}
      <button
        onClick={() => toggleTheme("light")}
        className={`flex items-center px-2 py-1 mr-2 h-8 w-8 rounded-full focus:outline-none ${
          theme === "light" ? "bg-gray-500 text-white" : ""
        }`}
      >
        <SunIcon className="h-4 w-4" />
      </button>
      <button
        onClick={() => toggleTheme("dark")}
        className={`flex items-center px-2 py-1 mr-2 h-8 w-8 rounded-full focus:outline-none ${
          theme === "dark" ? "bg-gray-500 text-white" : ""
        }`}
      >
        <MoonIcon className="h-4 w-4" />
      </button>
      <button
        onClick={() => toggleTheme("system")}
        className={`flex items-center px-2 py-1 rounded-full h-8 w-8 focus:outline-none ${
          theme === "system" ? "bg-gray-500 text-white" : ""
        }`}
      >
        <Monitor size={16} className="" />
      </button>
    </div>
  );
}



