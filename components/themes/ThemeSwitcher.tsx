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
      <button onClick={toggleTheme} aria-label="Toggle theme" className="m-4 flex justify-end">
        {theme === "light" ? <Moon size={32} strokeWidth={1.5} /> : <Sun size={32} strokeWidth={1.5} />}
      </button>
    </div>
  );
}


