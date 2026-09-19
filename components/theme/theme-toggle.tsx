"use client";

import { Moon01Icon, Sun01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "@/components/theme/theme-provider";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
      className="theme-toggle"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      type="button"
    >
      <HugeiconsIcon
        aria-hidden="true"
        icon={isLight ? Moon01Icon : Sun01Icon}
        size="1em"
      />
    </button>
  );
}
