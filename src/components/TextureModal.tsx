"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cx } from "@/lib/utils";

export type TextureItem = {
  id: string;
  series: string;
  src: { thumb: string; preview: string; full: string };
  width: number | null;
  height: number | null;
};

export function TextureModal({
  open,
  onClose,
  item,
  ctaHref = "mailto:sales@rpgroupltd.com?subject=Texture%20enquiry",
}: {
  open: boolean;
  onClose: () => void;
  item: TextureItem | null;
  ctaHref?: string;
}) {
  const [mode, setMode] = useState<"preview" | "magnify">("preview");
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Note: we intentionally avoid resetting state in an effect to satisfy lint rules.

  const title = useMemo(() => (item ? item.id : "Texture"), [item]);

  if (!open || !item) return null;

  const onMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setPos({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
  };

  const bgPos = `${(pos.x * 100).toFixed(2)}% ${(pos.y * 100).toFixed(2)}%`;

  return (
    <div
      className="fixed inset-0 z-50"
      aria-modal="true"
      role="dialog"
      aria-label={`${title} texture viewer`}
    >
      <button
        className="absolute inset-0 bg-black/65 backdrop-blur-[6px]"
        onClick={() => {
          setMode("preview");
          onClose();
        }}
        aria-label="Close"
      />

      <div className="absolute inset-x-0 top-4 mx-auto w-[min(1100px,92vw)]">
        <div className="rounded-2xl border border-white/10 bg-white/5 shadow-[0_30px_80px_var(--shadow)]">
          <div className="flex flex-wrap items-center gap-3 border-b border-[var(--stroke)] px-4 py-3">
            <div className="min-w-[10rem]">
              <div className="font-[var(--font-display)] text-[13px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Texture
              </div>
              <div className="text-lg font-semibold text-[color:var(--text)]">{title}</div>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <div className="flex items-center rounded-full border border-[var(--stroke)] bg-[var(--panel)] p-1 text-sm">
                <button
                  onClick={() => setMode("preview")}
                  className={cx(
                    "rounded-full px-3 py-1 transition",
                    mode === "preview"
                      ? "bg-black/10 text-[color:var(--text)]"
                      : "text-[color:var(--muted)] hover:text-[color:var(--text)]"
                  )}
                >
                  Preview
                </button>
                <button
                  onClick={() => setMode("magnify")}
                  className={cx(
                    "rounded-full px-3 py-1 transition",
                    mode === "magnify"
                      ? "bg-black/10 text-[color:var(--text)]"
                      : "text-[color:var(--muted)] hover:text-[color:var(--text)]"
                  )}
                >
                  Magnify
                </button>
              </div>

              <a
                className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[var(--stroke)] bg-[var(--panel)] px-4 py-2 text-sm text-[color:var(--muted)] hover:bg-[var(--panel2)]"
                href={ctaHref}
                target="_blank"
                rel="noreferrer"
              >
                Request this texture
                <span className="text-[color:var(--faint)]">→</span>
              </a>

              <a
                className="inline-flex items-center gap-2 rounded-full border border-[var(--stroke)] bg-[var(--panel)] px-4 py-2 text-sm text-[color:var(--muted)] hover:bg-[var(--panel2)]"
                href={item.src.full}
                target="_blank"
                rel="noreferrer"
              >
                Open full
              </a>

              <button
                onClick={() => {
                  setMode("preview");
                  onClose();
                }}
                className="inline-flex items-center justify-center rounded-full border border-[var(--stroke)] bg-[var(--panel)] px-3 py-2 text-sm text-[color:var(--muted)] hover:bg-[var(--panel2)]"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-4">
            <div
              ref={wrapRef}
              onMouseMove={mode === "magnify" ? onMove : undefined}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-black/25"
            >
              {/* Base preview */}
              <img
                src={item.src.preview}
                alt={`${title} mould texture`}
                className={cx(
                  "block h-auto w-full select-none",
                  mode === "magnify" && "opacity-0"
                )}
                draggable={false}
              />

              {/* Magnifier layer */}
              {mode === "magnify" && (
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${item.src.full})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "220%",
                    backgroundPosition: bgPos,
                  }}
                />
              )}

              {/* Loupe */}
              {mode === "magnify" && (
                <div
                  className="pointer-events-none absolute hidden sm:block"
                  style={{
                    left: `${pos.x * 100}%`,
                    top: `${pos.y * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="h-[160px] w-[160px] rounded-full border border-white/30 shadow-[0_18px_50px_rgba(0,0,0,0.55)] ring-2 ring-[var(--ring)]" />
                </div>
              )}

              {/* Hint */}
              {mode === "magnify" && (
                <div className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/75">
                  Move cursor to pan. (On mobile: use “Open full”.)
                </div>
              )}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[color:var(--muted)]">
              <span className="rounded-full border border-[var(--stroke)] bg-[var(--panel)] px-3 py-1">
                ID: <span className="text-[color:var(--text)]">{item.id}</span>
              </span>
              <span className="rounded-full border border-[var(--stroke)] bg-[var(--panel)] px-3 py-1">
                Series: <span className="text-[color:var(--text)]">{item.series}</span>
              </span>
              {item.width && item.height && (
                <span className="rounded-full border border-[var(--stroke)] bg-[var(--panel)] px-3 py-1">
                  Original: <span className="text-[color:var(--text)]">{item.width}×{item.height}</span>
                </span>
              )}
              <span className="ml-auto text-[color:var(--faint)]">
                Tip: Link to this texture for SEO.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
