import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { email?: string; name?: string; source?: string; intent?: string }
    | null;

  const email = (body?.email ?? "").trim();
  const name = (body?.name ?? "").trim();

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { ok: false, message: "Invalid email." },
      { status: 400 }
    );
  }

  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (!webhook) {
    // We intentionally don't pretend to store anything server-side without a configured destination.
    return NextResponse.json(
      {
        ok: false,
        message:
          "Lead capture backend not configured yet (missing LEADS_WEBHOOK_URL).",
      },
      { status: 501 }
    );
  }

  try {
    const r = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email,
        name: name || undefined,
        source: body?.source ?? "mould-texture-gallery",
        intent: body?.intent ?? "newsletter",
        ts: new Date().toISOString(),
      }),
    });

    if (!r.ok) {
      const t = await r.text().catch(() => "");
      return NextResponse.json(
        {
          ok: false,
          message: `Webhook rejected (${r.status}). ${t.slice(0, 160)}`,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, message: "Sent — check your inbox." });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, message: "Failed to reach capture webhook." },
      { status: 502 }
    );
  }
}
