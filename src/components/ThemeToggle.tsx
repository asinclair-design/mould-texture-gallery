"use client";

import { useEffect, useState } from "react";
import { cx } from "@/lib/utils";

type Theme = "dark" | "rpg";

const STORAGE_KEY = "textureGalleryTheme";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? null;
    const t: Theme = saved === "rpg" ? "rpg" : "dark";
    setTheme(t);
    applyTheme(t);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--stroke)] bg-[var(--panel)] px-2 py-1">
      <span className="hidden sm:inline text-xs text-[color:var(--muted)]">
        Style
      </span>
      <button
        type="button"
        onClick={() => {
          const next: Theme = theme === "dark" ? "rpg" : "dark";
          setTheme(next);
          localStorage.setItem(STORAGE_KEY, next);
          applyTheme(next);
        }}
        className={cx(
          "relative h-8 w-[92px] rounded-full border border-[var(--stroke)] transition",
          "bg-black/20"
        )}
        aria-label="Toggle theme"
      >
        <span
          className={cx(
            "absolute left-1 top-1 h-6 w-[42px] rounded-full",
            "bg-white/10 shadow-[0_10px_22px_rgba(0,0,0,0.35)]",
            "transition-transform",
            theme === "rpg" && "translate-x-[44px]"
          )}
        />
        <span className="absolute inset-0 flex items-center justify-between px-3 text-[11px] font-semibold tracking-wide">
          <span className={theme === "dark" ? "text-white" : "text-[color:var(--faint)]"}>
            DARK
          </span>
          <span className={theme === "rpg" ? "text-white" : "text-[color:var(--faint)]"}>
            RPG
          </span>
        </span>
      </button>
    </div>
  );
}
