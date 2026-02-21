"use client";

import { useMemo, useState } from "react";
import { cx } from "@/lib/utils";

export function LeadMagnetCTA() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "sending" }
    | { kind: "ok"; message: string }
    | { kind: "err"; message: string }
  >({ kind: "idle" });

  const validEmail = useMemo(() => {
    const e = email.trim();
    return e.includes("@");
  }, [email]);

  async function submit() {
    if (!validEmail) {
      setStatus({ kind: "err", message: "Please enter a valid email." });
      return;
    }

    setStatus({ kind: "sending" });

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || undefined,
          source: "mould-texture-gallery",
          intent: "ebook",
        }),
      });

      const data = (await res.json()) as { ok: boolean; message?: string };

      if (!res.ok || !data.ok) {
        // Fallback: store locally so we still capture something during setup.
        try {
          const key = "textureGalleryLeads";
          const prev = JSON.parse(localStorage.getItem(key) ?? "[]") as any[];
          prev.push({ email: email.trim(), name: name.trim(), at: Date.now() });
          localStorage.setItem(key, JSON.stringify(prev));
        } catch {}

        setStatus({
          kind: "err",
          message:
            data.message ??
            "Capture endpoint not configured yet — saved locally in this browser for now.",
        });
        return;
      }

      setStatus({ kind: "ok", message: data.message ?? "You’re in." });
      setEmail("");
      setName("");
    } catch (e: any) {
      setStatus({
        kind: "err",
        message:
          "Couldn’t submit right now. (If this persists, we’ll wire in a webhook.)",
      });
    }
  }

  return (
    <section className="mt-7">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--stroke)] bg-[var(--panel)] shadow-[0_24px_70px_rgba(0,0,0,0.40)]">
        <div className="absolute inset-0">
          <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[color:var(--accent)]/12 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-[color:var(--accent2)]/10 blur-3xl" />
        </div>

        <div className="relative grid gap-6 p-5 md:grid-cols-[1.25fr_1fr] md:p-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--stroke)] bg-black/15 px-3 py-1 text-xs text-[color:var(--muted)]">
              Lead magnet
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
              Free PDF
            </div>

            <h2 className="mt-3 font-[var(--font-display)] text-2xl leading-tight text-[color:var(--text)] md:text-3xl">
              Get the “Surface Finish & Texture Spec Guide”
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">
              We’ll email you a short, practical reference you can forward to your
              engineers: what to specify, what to avoid, and how texture choices
              impact tooling cost, cycle time, and cosmetic risk.
            </p>

            <ul className="mt-4 grid gap-2 text-sm text-[color:var(--muted)]">
              <li className="flex gap-2">
                <span className="mt-0.5 text-[color:var(--accent)]">▸</span>
                How to call out texture IDs cleanly in drawings / RFQs
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-[color:var(--accent)]">▸</span>
                Common failure modes: gloss mismatch, sink, weld lines, dirt traps
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-[color:var(--accent)]">▸</span>
                Quick DFM questions that save weeks
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[var(--stroke)] bg-black/15 p-4 md:p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--faint)]">
              Send me the guide
            </div>

            <div className="mt-3 grid gap-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name (optional)"
                className={cx(
                  "w-full rounded-xl border border-[var(--stroke)] bg-black/25 px-3 py-2 text-sm text-[color:var(--text)]",
                  "placeholder:text-[color:var(--faint)]",
                  "focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                )}
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Work email"
                inputMode="email"
                className={cx(
                  "w-full rounded-xl border border-[var(--stroke)] bg-black/25 px-3 py-2 text-sm text-[color:var(--text)]",
                  "placeholder:text-[color:var(--faint)]",
                  "focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                )}
              />

              <button
                type="button"
                onClick={submit}
                disabled={status.kind === "sending"}
                className={cx(
                  "mt-1 inline-flex items-center justify-center rounded-xl border border-[var(--stroke)]",
                  "bg-[color:var(--accent)]/15 px-3 py-2 text-sm font-semibold text-[color:var(--text)]",
                  "hover:bg-[color:var(--accent)]/22",
                  "disabled:opacity-60"
                )}
              >
                {status.kind === "sending" ? "Sending…" : "Email me the PDF"}
              </button>

              {status.kind === "ok" && (
                <div className="rounded-xl border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/10 px-3 py-2 text-sm text-[color:var(--text)]">
                  {status.message}
                </div>
              )}

              {status.kind === "err" && (
                <div className="rounded-xl border border-[color:var(--danger)]/30 bg-[color:var(--danger)]/10 px-3 py-2 text-sm text-[color:var(--text)]">
                  {status.message}
                </div>
              )}

              <div className="pt-1 text-xs text-[color:var(--faint)]">
                No spam. One practical email per week. Unsubscribe any time.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
