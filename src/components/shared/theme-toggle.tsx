"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useSyncExternalStore } from "react";

// Client-only mounting check without useEffect setState
const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="rounded-full">
        <Sun className="h-[18px] w-[18px]" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full text-muted-foreground hover:bg-accent"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-[18px] w-[18px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[18px] w-[18px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
