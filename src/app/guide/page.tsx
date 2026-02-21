import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Surface Finish & Texture Spec Guide",
  description:
    "A practical reference for engineers: how to specify mould textures, avoid common failures, and save time on prototyping projects.",
  robots: { index: false, follow: false },
};

export default function GuidePage() {
  return (
    <div className="mx-auto w-[min(820px,92vw)] py-12 pb-24">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--stroke)] bg-[var(--panel)] px-3 py-1 text-xs text-[color:var(--muted)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
          RP Group — Free Guide
        </div>
        <h1 className="mt-4 font-[var(--font-display)] text-3xl leading-tight text-[color:var(--text)] md:text-5xl">
          Surface Finish &amp; Texture Spec Guide
        </h1>
        <p className="mt-3 text-[color:var(--muted)] leading-relaxed md:text-lg">
          A practical reference for product engineers, tooling managers, and
          procurement teams working with injection-moulded or CNC-machined
          parts. Written by RP Group — IATF 16949-certified Tier-1 automotive
          supplier.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-[color:var(--faint)]">
          <span className="rounded-full border border-[var(--stroke)] bg-[var(--panel)] px-3 py-1">
            v1.0 — February 2026
          </span>
          <span className="rounded-full border border-[var(--stroke)] bg-[var(--panel)] px-3 py-1">
            ~8 min read
          </span>
          <a
            href="https://mould-texture-gallery.vercel.app"
            className="rounded-full border border-[var(--stroke)] bg-[var(--panel)] px-3 py-1 hover:bg-[var(--panel2)]"
          >
            Browse Texture Gallery →
          </a>
        </div>
      </div>

      <article className="prose-custom space-y-10">
        {/* Section 1 */}
        <Section num="01" title="Why Texture Specification Matters">
          <p>
            Surface texture isn't cosmetic afterthought — it's a functional
            decision that affects:
          </p>
          <ul>
            <li>
              <strong>Part release</strong> — textured surfaces increase draft
              angle requirements (rule of thumb: +1° per 0.025 mm texture
              depth).
            </li>
            <li>
              <strong>Cosmetic consistency</strong> — gloss levels, weld-line
              visibility, and gate vestige all interact with the chosen texture.
            </li>
            <li>
              <strong>Tooling cost &amp; lead time</strong> — some textures
              require chemical etching; others can be EDM'd or laser-engraved.
              The choice impacts mould steel selection and polishing steps.
            </li>
            <li>
              <strong>End-user perception</strong> — haptics, fingerprint
              resistance, and perceived quality.
            </li>
          </ul>
          <Callout>
            Specifying texture early (at DFM review, not after T1 samples)
            avoids the #1 cause of late-stage tool rework on interior
            automotive parts.
          </Callout>
        </Section>

        {/* Section 2 */}
        <Section num="02" title="How to Call Out Textures in Drawings / RFQs">
          <p>Use this format on your 2D drawing or part spec sheet:</p>
          <CodeBlock>
            {`SURFACE FINISH: [TEXTURE ID] per [STANDARD]
Example: MT-11010 per Mold-Tech standard
         or: JY22040 per RP Group texture library
         or: VDI 3400 Ref 33 (Ra 2.2 µm)

GLOSS LEVEL: [XX] GU @ 60° (if applicable)
DRAFT ANGLE: minimum [X.X]° on textured faces`}
          </CodeBlock>
          <p>
            <strong>Always include:</strong>
          </p>
          <ol>
            <li>
              Texture ID or standard reference (Mold-Tech, VDI 3400, SPI, or
              proprietary like JY/LH series).
            </li>
            <li>
              Gloss target if cosmetic (measured in Gloss Units at 60°).
            </li>
            <li>
              Minimum draft angle on textured walls — this prevents drag marks
              and ejection damage.
            </li>
            <li>
              Surface area boundaries — mark which faces get texture vs.
              polished vs. as-machined.
            </li>
          </ol>
          <Callout>
            Pro tip: When sending RFQs to multiple suppliers, attach a physical
            texture sample or a high-res photo (like the ones in our gallery)
            alongside the spec. It eliminates ambiguity.
          </Callout>
        </Section>

        {/* Section 3 */}
        <Section num="03" title="Common Texture Standards">
          <div className="grid gap-3 md:grid-cols-2">
            <InfoCard title="Mold-Tech (MT)">
              Industry standard for chemical etching. MT-11000 series (fine
              grain) through MT-11500 series (heavy leather). Most automotive
              OEMs reference Mold-Tech by default.
            </InfoCard>
            <InfoCard title="VDI 3400">
              German standard based on EDM (spark erosion) finishes. Ref 12
              (mirror-like) to Ref 45 (coarse). Commonly used in European
              automotive and medical.
            </InfoCard>
            <InfoCard title="SPI (Plastics Industry)">
              A-1 (diamond polish) through D-3 (dry blast). Best for optical
              clarity or intentional matte. Less common for textured surfaces.
            </InfoCard>
            <InfoCard title="Proprietary (JY / LH series)">
              RP Group's in-house texture library. Optimized for our tooling
              capabilities. Browse them at{" "}
              <a
                href="https://mould-texture-gallery.vercel.app"
                className="text-[color:var(--accent)] underline"
              >
                mould-texture-gallery.vercel.app
              </a>
              .
            </InfoCard>
          </div>
        </Section>

        {/* Section 4 */}
        <Section num="04" title="Common Failure Modes &amp; How to Avoid Them">
          <div className="space-y-4">
            <Failure
              name="Gloss Mismatch"
              cause="Adjacent parts textured by different suppliers or at different times."
              fix="Specify gloss range (e.g. 1.8–2.4 GU @ 60°) and require a colour/gloss master sample. Run matching panels together."
            />
            <Failure
              name="Sink Marks Through Texture"
              cause="Wall thickness variation or rib-to-wall ratio > 60%."
              fix="Follow rib thickness ≤ 50% of nominal wall. Consider gas-assist or foam-core for thick sections."
            />
            <Failure
              name="Weld Lines Visible on Textured Surface"
              cause="Flow fronts meeting on a cosmetic face."
              fix="Move gate location, adjust melt/mould temperature, or add overflow wells. Deep textures (MT-11500+) help hide weld lines."
            />
            <Failure
              name="Drag Marks / Scuffing on Ejection"
              cause="Insufficient draft on textured walls."
              fix="Add +1° draft per 0.025 mm (0.001″) of texture depth beyond the standard 1° minimum. Polish ejector side if needed."
            />
            <Failure
              name="Dirt Traps / Cleaning Difficulty"
              cause="Deep, narrow texture valleys that trap mould release, dust, or pigment."
              fix="Choose textures with rounded valleys (not sharp V-grooves) for parts that need frequent cleaning or food contact."
            />
          </div>
        </Section>

        {/* Section 5 */}
        <Section num="05" title="Quick DFM Questions That Save Weeks">
          <p>
            Ask these <strong>before</strong> tool steel is ordered:
          </p>
          <ol>
            <li>
              <strong>What's the minimum draft on textured faces?</strong> — If
              the answer is "1°", you'll likely need to increase it.
            </li>
            <li>
              <strong>Is the texture applied before or after tool
              hardening?</strong> — Chemical etching on pre-hardened steel risks
              uneven depth.
            </li>
            <li>
              <strong>How will texture be maintained over tool life?</strong> —
              Etched textures wear. Plan for re-etching intervals (typically
              every 50–100k shots depending on resin).
            </li>
            <li>
              <strong>Are there undercuts or lifters on textured faces?</strong>{" "}
              — Texture across parting lines or lifter edges creates witness
              marks.
            </li>
            <li>
              <strong>What resin + colour?</strong> — Glass-filled resins
              accelerate texture wear. Dark colours show gloss variation more
              than light.
            </li>
            <li>
              <strong>Is this a prototype or production texture?</strong> — For
              proto (CNC patterns, soft tools), laser engraving or bead
              blasting is faster and cheaper than chemical etching.
            </li>
          </ol>
          <Callout>
            RP Group can turn around textured CNC patterns in 5 days and soft
            tooling with texture in 10 days. If you need fast iteration before
            committing to production texture, talk to us.
          </Callout>
        </Section>

        {/* Section 6 */}
        <Section num="06" title="Texture Depth vs. Draft Angle Quick Reference">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-[color:var(--muted)] border-b border-[var(--stroke)]">
                  <th className="py-2 pr-4">Texture Depth</th>
                  <th className="py-2 pr-4">Min. Additional Draft</th>
                  <th className="py-2 pr-4">Total Draft (typical)</th>
                  <th className="py-2">Example Textures</th>
                </tr>
              </thead>
              <tbody className="text-[color:var(--text)]">
                <tr className="border-b border-[var(--stroke)]">
                  <td className="py-2 pr-4">0.013 mm (0.0005″)</td>
                  <td className="py-2 pr-4">+0.5°</td>
                  <td className="py-2 pr-4">1.5°</td>
                  <td className="py-2">SPI C-1, fine polish</td>
                </tr>
                <tr className="border-b border-[var(--stroke)]">
                  <td className="py-2 pr-4">0.025 mm (0.001″)</td>
                  <td className="py-2 pr-4">+1.0°</td>
                  <td className="py-2 pr-4">2.0°</td>
                  <td className="py-2">MT-11010, VDI 24</td>
                </tr>
                <tr className="border-b border-[var(--stroke)]">
                  <td className="py-2 pr-4">0.050 mm (0.002″)</td>
                  <td className="py-2 pr-4">+2.0°</td>
                  <td className="py-2 pr-4">3.0°</td>
                  <td className="py-2">MT-11030, VDI 30</td>
                </tr>
                <tr className="border-b border-[var(--stroke)]">
                  <td className="py-2 pr-4">0.075 mm (0.003″)</td>
                  <td className="py-2 pr-4">+3.0°</td>
                  <td className="py-2 pr-4">4.0°</td>
                  <td className="py-2">MT-11300, leather grain</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">0.100+ mm (0.004″+)</td>
                  <td className="py-2 pr-4">+4.0°+</td>
                  <td className="py-2 pr-4">5.0°+</td>
                  <td className="py-2">MT-11500+, heavy geometric</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* Section 7 */}
        <Section num="07" title="Next Steps">
          <div className="grid gap-3 md:grid-cols-2">
            <InfoCard title="Browse Our Texture Library">
              50 high-res texture samples with zoom and magnifier.{" "}
              <a
                href="https://mould-texture-gallery.vercel.app"
                className="text-[color:var(--accent)] underline"
              >
                Open Gallery →
              </a>
            </InfoCard>
            <InfoCard title="Get a Quote">
              Tell us the texture ID, part material, and expected volumes.{" "}
              <a
                href="mailto:sales@rpgroupltd.com?subject=Texture%20enquiry%20from%20spec%20guide"
                className="text-[color:var(--accent)] underline"
              >
                Email RP Group →
              </a>
            </InfoCard>
          </div>
          <p className="mt-4 text-sm text-[color:var(--faint)]">
            RP Group Limited — IATF 16949 certified · Dongguan, China ·{" "}
            <a
              href="https://www.rpgrouplimited.com"
              className="underline"
              target="_blank"
              rel="noreferrer"
            >
              rpgrouplimited.com
            </a>
          </p>
        </Section>
      </article>
    </div>
  );
}

/* ─── Reusable sub-components (co-located for simplicity) ─── */

function Section({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-[var(--font-display)] text-sm text-[color:var(--accent)]">
          {num}
        </span>
        <h2 className="font-[var(--font-display)] text-xl text-[color:var(--text)] md:text-2xl">
          {title}
        </h2>
      </div>
      <div className="space-y-3 text-sm leading-relaxed text-[color:var(--muted)] [&_strong]:text-[color:var(--text)] [&_li]:ml-5 [&_ul]:list-disc [&_ol]:list-decimal [&_a]:text-[color:var(--accent)] [&_a]:underline">
        {children}
      </div>
    </section>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[color:var(--accent)]/25 bg-[color:var(--accent)]/8 px-4 py-3 text-sm text-[color:var(--text)]">
      {children}
    </div>
  );
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-[var(--stroke)] bg-black/10 px-4 py-3 text-xs leading-relaxed text-[color:var(--text)]">
      <code>{children}</code>
    </pre>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[var(--stroke)] bg-[var(--panel)] p-4">
      <div className="text-xs font-semibold text-[color:var(--muted)] uppercase tracking-wide mb-1">
        {title}
      </div>
      <div className="text-sm text-[color:var(--text)] leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function Failure({
  name,
  cause,
  fix,
}: {
  name: string;
  cause: string;
  fix: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--stroke)] bg-[var(--panel)] p-4">
      <div className="font-semibold text-[color:var(--text)]">{name}</div>
      <div className="mt-1 text-sm text-[color:var(--muted)]">
        <strong className="text-[color:var(--danger)]">Cause:</strong> {cause}
      </div>
      <div className="mt-1 text-sm text-[color:var(--muted)]">
        <strong className="text-[color:var(--accent2)]">Fix:</strong> {fix}
      </div>
    </div>
  );
}
