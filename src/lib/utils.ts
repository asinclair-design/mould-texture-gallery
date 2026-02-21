export function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function seriesLabel(series: string) {
  if (series === "JY") return "JY Series";
  if (series === "LH") return "LH Series";
  return series;
}
