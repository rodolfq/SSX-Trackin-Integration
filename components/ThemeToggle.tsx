"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9 rounded-md border border-border" />; // Placeholder
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-md border border-border bg-background hover:bg-secondary/50 text-foreground transition-colors flex items-center justify-center relative w-9 h-9"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Sun className="h-[1.125rem] w-[1.125rem] transition-all" />
      ) : (
        <Moon className="h-[1.125rem] w-[1.125rem] transition-all" />
      )}
    </button>
  );
}
