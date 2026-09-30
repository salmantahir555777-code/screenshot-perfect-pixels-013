import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/information")({
  head: () => ({
    meta: [
      { title: "Customer Care — Shipping, Returns & FAQ | LHR Art Galleries" },
      {
        name: "description",
        content:
          "Shipping, returns, certificates of authenticity and frequently asked questions at LHR Art Galleries.",
      },
      { property: "og:title", content: "Customer Care | LHR Art Galleries" },
      {
        property: "og:description",
        content: "Shipping, returns, authenticity and answers to common questions.",
      },
    ],
  }),
  component: Information,
});

const SECTIONS = [
  {
    id: "shipping",
    title: "Shipping",
    body: [
      "Every painting is corner-guarded, wrapped in glassine, and crated or rigid-boxed before it leaves the gallery. Delivery inside Pakistan is a flat PKR 4,500 and takes two to five working days; oversized works are crated and delivered by hand in Lahore and by insured courier elsewhere.",
      "International delivery to the GCC, UK and US is quoted per work before you confirm your order, including insurance. A tracking number follows every dispatch.",
    ],
  },
  {
    id: "returns",
    title: "Returns",
    body: [
      "Original paintings may be returned within fourteen days of delivery, in their original packaging and condition, for a full refund of the work. Return collection is arranged by the gallery; return freight is paid by the collector unless the work arrived damaged.",
      "If a painting arrives damaged, photograph the packaging and the work and write to us within forty-eight hours — we collect, replace or refund at your preference.",
    ],
  },
  {
    id: "authenticity",
    title: "Authenticity",
    body: [
      "Every work is a hand-painted original: no prints, no reproductions, no workshop production. Each painting is accompanied by a signed certificate of authenticity recording the artist, title, medium, dimensions and year.",
      "We acquire directly from the artists we represent and visit their studios, so the chain of custody from easel to wall is one we know personally.",
    ],
  },
  {
    id: "faq",
    title: "FAQ",
    body: [
      "Can I see a painting in person before buying? Yes — viewings at the Lahore gallery are by appointment; write to hello@lhrartgalleries.pk.",
      "Do you hang paintings for clients? In Lahore, yes. We advise on placement and can arrange professional hanging for larger works.",
      "Are prices negotiable? Prices are set with the artists and held firmly, which keeps the market fair for the painters and earlier collectors.",
      "Can I commission a painting? Yes — portraits, family scenes and landscapes. See the Commission page for how the process works.",
    ],
  },
];

function Information() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="pt-[68px] md:pt-20">
      <header className="gallery-container py-20 md:py-28">
        <p className="label-xs text-muted-foreground">Customer care</p>
        <h1 className="display-lg mt-6 max-w-2xl">The details, in plain words.</h1>
      </header>

      <div className="gallery-container grid gap-16 pb-24 lg:grid-cols-[220px_1fr] md:pb-32">
        <nav aria-label="Sections" className="h-fit lg:sticky lg:top-28">
          <ul className="space-y-3">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="label-xs link-underline">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="max-w-2xl space-y-20">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.id} as="section" delay={i * 60}>
              <div id={s.id} className="scroll-mt-28">
                <h2 className="display-md">{s.title}</h2>
                <div className="mt-8 space-y-6">
                  {s.body.map((p) => (
                    <p key={p.slice(0, 24)} className="text-sm leading-relaxed text-muted-foreground">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
