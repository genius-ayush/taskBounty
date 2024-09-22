"use client";
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function SelectTheme() {
  const { setTheme, theme } = useTheme();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="w-9 px-0"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <Sun className="size-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 h-4 w-4" />
        <Moon className="absolute size-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 h-4 w-4 " />
      </Button>
    </>
  );
}
