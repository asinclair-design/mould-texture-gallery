"use client";

import { cx } from "@/lib/utils";

export type TextureCardItem = {
  id: string;
  series: string;
  src: { thumb: string; preview: string; full: string };
  width: number | null;
  height: number | null;
};

export function TextureCard({
  item,
  onOpen,
}: {
  item: TextureCardItem;
  onOpen: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item.id)}
      className={cx(
        "group relative overflow-hidden rounded-2xl border border-[var(--stroke)] bg-[var(--panel)] text-left",
        "transition hover:border-[var(--stroke2)] hover:bg-[var(--panel2)]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
      )}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-[color:var(--accent)]/10 blur-2xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[color:var(--accent2)]/8 blur-3xl" />
      </div>

      <div className="relative">
        <div className="aspect-[4/3] w-full overflow-hidden bg-black/30">
          <img
            src={item.src.thumb}
            alt={`${item.id} mould texture thumbnail`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>

        <div className="flex items-start gap-3 px-3 py-3">
          <div className="min-w-0">
            <div className="truncate font-[var(--font-display)] text-[13px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
              {item.series}
            </div>
            <div className="truncate text-base font-semibold text-[color:var(--text)]">
              {item.id}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2 text-xs text-[color:var(--muted)]">
            <span className="rounded-full border border-[var(--stroke)] bg-black/10 px-2 py-1">
              View
            </span>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--stroke)] bg-black/10 text-[color:var(--muted)] transition group-hover:bg-black/15">
              🔎
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
