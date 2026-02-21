import textures from "@/data/textures.json";

export default function sitemap() {
  const base = "https://textures.rpgroupltd.com";
  const items = (textures as Array<{ id: string }>).map((t) => ({
    url: `${base}/texture/${t.id}`,
    lastModified: new Date("2026-02-21T00:00:00.000Z"),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: `${base}/`,
      lastModified: new Date("2026-02-21T00:00:00.000Z"),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...items,
  ];
}
