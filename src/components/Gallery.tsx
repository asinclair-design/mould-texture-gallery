"use client";

import { useMemo, useState } from "react";
import textures from "@/data/textures.json";
import { TextureCard } from "@/components/TextureCard";
import { TextureModal } from "@/components/TextureModal";
import { cx, seriesLabel } from "@/lib/utils";

type TextureItem = (typeof textures)[number];

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export function Gallery() {
  const [q, setQ] = useState("");
  const [series, setSeries] = useState<"All" | "JY" | "LH">("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const items = useMemo(() => {
    const nq = normalize(q);
    return (textures as TextureItem[]).filter((t) => {
      const okSeries = series === "All" ? true : t.series === series;
      const okQ = nq.length === 0 ? true : t.id.toLowerCase().includes(nq);
      return okSeries && okQ;
    });
  }, [q, series]);

  const openItem = useMemo(() => {
    if (!openId) return null;
    return (textures as TextureItem[]).find((t) => t.id === openId) ?? null;
  }, [openId]);

  return (
    <div className="mx-auto w-[min(1200px,92vw)] pb-24">
      <header className="pt-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
              Fast, searchable, zoomable
            </div>
            <h1 className="mt-4 font-[var(--font-display)] text-3xl leading-[1.05] tracking-[-0.02em] text-white md:text-5xl">
              Mould Texture Gallery
            </h1>
            <p className="mt-3 max-w-[64ch] text-sm leading-relaxed text-white/65 md:text-base">
              Each texture is labelled by its file name. Click any tile to open the
              inspector (preview + magnifier). Use this as a reference when
              specifying surface finishes for prototypes and low-volume builds.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/60">
              <a
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10"
                href="mailto:sales@rpgroupltd.com?subject=Mould%20texture%20enquiry"
              >
                Contact RP Group →
              </a>
              <a
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10"
                href="https://www.rpgroupltd.com"
                target="_blank"
                rel="noreferrer"
              >
                rpgroupltd.com
              </a>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                {items.length} shown
              </span>
            </div>
          </div>

          <div className="w-full md:w-[420px]">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
              <label className="block text-xs font-medium text-white/70">
                Search by texture ID
              </label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="e.g. JY22040"
                  className={cx(
                    "w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white",
                    "placeholder:text-white/35",
                    "focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setQ("")}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
                >
                  Clear
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {(["All", "JY", "LH"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSeries(s)}
                    className={cx(
                      "rounded-full border px-3 py-1 text-xs transition",
                      series === s
                        ? "border-white/20 bg-white/10 text-white"
                        : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {s === "All" ? "All series" : seriesLabel(s)}
                  </button>
                ))}
              </div>

              <div className="mt-3 text-xs text-white/55">
                Tip: the magnifier uses an optimized “full” image (WebP) to keep
                the page fast.
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mt-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <TextureCard key={t.id} item={t} onOpen={setOpenId} />
          ))}
        </div>
      </main>

      <TextureModal
        open={openId !== null}
        onClose={() => setOpenId(null)}
        item={openItem}
        ctaHref={
          openItem
            ? `mailto:sales@rpgroupltd.com?subject=Texture%20enquiry%20(${encodeURIComponent(
                openItem.id
              )})`
            : undefined
        }
      />

      <footer className="mt-16 border-t border-white/10 pt-8 text-sm text-white/55">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} RP Group Limited. Texture IDs shown are
            filename-based.
          </div>
          <div className="text-white/45">
            Built for speed: thumbnails + previews + on-demand zoom.
          </div>
        </div>
      </footer>
    </div>
  );
}
