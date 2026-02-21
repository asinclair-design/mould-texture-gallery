import type { Metadata } from "next";
import Link from "next/link";
import textures from "@/data/textures.json";

type TextureItem = (typeof textures)[number];

export function generateStaticParams() {
  return (textures as TextureItem[]).map((t) => ({ id: t.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const id = params.id;
  const item = (textures as TextureItem[]).find((t) => t.id === id);

  return {
    title: item ? `Texture ${item.id}` : `Texture ${id}`,
    description: item
      ? `Mould texture ${item.id} (series ${item.series}). Click to inspect details.`
      : `Mould texture ${id}.`,
    alternates: { canonical: `/texture/${id}` },
    openGraph: {
      title: item ? `Texture ${item.id}` : `Texture ${id}`,
      url: `/texture/${id}`,
      images: item
        ? [{ url: item.src.preview, width: 1400, height: 1050, alt: item.id }]
        : undefined,
    },
  };
}

export default function TexturePage({ params }: { params: { id: string } }) {
  const id = params.id;
  const item = (textures as TextureItem[]).find((t) => t.id === id);

  if (!item) {
    return (
      <div className="mx-auto w-[min(900px,92vw)] py-16">
        <h1 className="font-[var(--font-display)] text-3xl text-white">
          Texture not found
        </h1>
        <p className="mt-3 text-white/65">
          We couldn’t find “{id}”. Go back to the gallery.
        </p>
        <Link
          className="mt-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
          href="/"
        >
          ← Back to gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-[min(1100px,92vw)] py-10 pb-24">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="font-[var(--font-display)] text-[13px] uppercase tracking-[0.18em] text-white/70">
            Texture
          </div>
          <h1 className="mt-1 font-[var(--font-display)] text-3xl text-white md:text-4xl">
            {item.id}
          </h1>
          <p className="mt-2 text-sm text-white/65">
            Series: <span className="text-white/85">{item.series}</span> ·
            Optimized for fast browsing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
            href="/"
          >
            ← Gallery
          </Link>
          <a
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
            href={item.src.full}
            target="_blank"
            rel="noreferrer"
          >
            Open full
          </a>
          <a
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
            href={`mailto:sales@rpgroupltd.com?subject=Texture%20enquiry%20(${encodeURIComponent(
              item.id
            )})`}
          >
            Request this texture
          </a>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black/25">
        <img
          src={item.src.preview}
          alt={`${item.id} mould texture`}
          className="h-auto w-full"
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs font-semibold text-white/70">Texture ID</div>
          <div className="mt-1 text-lg font-semibold text-white">{item.id}</div>
          <div className="mt-2 text-sm text-white/60">
            This is based on the original file name.
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs font-semibold text-white/70">Series</div>
          <div className="mt-1 text-lg font-semibold text-white">{item.series}</div>
          <div className="mt-2 text-sm text-white/60">
            Grouping for quick filtering in the gallery.
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs font-semibold text-white/70">Need a quote?</div>
          <div className="mt-1 text-sm text-white/70">
            Tell us the texture ID, part material, and expected volumes.
          </div>
          <a
            href="mailto:sales@rpgroupltd.com?subject=Prototype%20enquiry%20-%20surface%20finish"
            className="mt-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 hover:bg-white/10"
          >
            Email RP Group
          </a>
        </div>
      </div>
    </div>
  );
}
