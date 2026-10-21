"use client";

import { Moon01Icon, Sun01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "@/components/theme/theme-provider";

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();
  const isLight = theme === "light";
  const nextTheme = isLight ? "dark" : "light";

  return (
    <button
      aria-label={`Switch to ${nextTheme} theme`}
      aria-pressed={isLight}
      className={className}
      onClick={() => setTheme(isLight ? "dark" : "light")}
      title={`Switch to ${nextTheme} theme`}
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
