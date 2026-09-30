import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import studio from "@/assets/studio-commission.jpg";

export const Route = createFileRoute("/commission")({
  head: () => ({
    meta: [
      { title: "Commission a Painting — LHR Art Galleries" },
      {
        name: "description",
        content:
          "Commission an original oil painting: portraits, family and wedding scenes, landscapes and cultural subjects, painted by hand in Lahore.",
      },
      { property: "og:title", content: "Commission a Painting | LHR Art Galleries" },
      {
        property: "og:description",
        content: "Portraits, family scenes and landscapes — made with you, in the artist's own hand.",
      },
    ],
  }),
  component: Commission,
});

const STEPS = [
  {
    t: "Conversation",
    d: "Tell us the subject, the wall it will hang on and the feeling you want. We suggest the artist and the scale.",
  },
  {
    t: "Proposal",
    d: "You receive a written proposal: dimensions, medium, palette and price, with a timeline of eight to twelve weeks.",
  },
  {
    t: "The painting",
    d: "The artist paints in their own studio. For portraits, sittings or photographs are arranged at the start.",
  },
  {
    t: "Delivery",
    d: "You approve a studio photograph before the work is crated, insured and delivered with its certificate.",
  },
];

function Commission() {
  const [sent, setSent] = useState(false);

  return (
    <div className="pt-[68px] md:pt-20">
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img
          src={studio}
          alt="A canvas on the easel in a Lahore studio"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="gallery-container relative flex h-full flex-col justify-end pb-16 text-ink-foreground">
          <p className="label-xs opacity-80">Commission</p>
          <h1 className="display-lg mt-4 max-w-2xl">Have a work made for you.</h1>
        </div>
      </section>

      <section className="gallery-container py-24 md:py-32">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.t} delay={i * 90}>
              <p className="label-xs text-accent">0{i + 1}</p>
              <h2 className="mt-5 text-xl">{s.t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border py-24 md:py-32">
        <div className="gallery-container grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <h2 className="display-md">Start a commission</h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Commissions begin at PKR 120,000 for small studies. Tell us a little about the
              project and we will reply within two working days.
            </p>
          </Reveal>
          <Reveal delay={120}>
            {sent ? (
              <div className="border border-border p-10">
                <h3 className="font-[family-name:var(--font-display)] text-3xl">
                  Thank you.
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Your commission enquiry has been received. We reply within two working days.
                </p>
              </div>
            ) : (
              <form
                className="space-y-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid gap-8 sm:grid-cols-2">
                  <label className="block">
                    <span className="label-xs text-muted-foreground">Name</span>
                    <input
                      required
                      type="text"
                      className="mt-3 w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground"
                    />
                  </label>
                  <label className="block">
                    <span className="label-xs text-muted-foreground">Email</span>
                    <input
                      required
                      type="email"
                      className="mt-3 w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="label-xs text-muted-foreground">Subject of the painting</span>
                  <input
                    required
                    type="text"
                    placeholder="A portrait, a landscape, a memory…"
                    className="mt-3 w-full border-b border-border bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-foreground"
                  />
                </label>
                <label className="block">
                  <span className="label-xs text-muted-foreground">Tell us more</span>
                  <textarea
                    rows={5}
                    className="mt-3 w-full resize-none border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground"
                  />
                </label>
                <button
                  type="submit"
                  className="label-xs bg-ink px-8 py-4 text-ink-foreground transition-opacity hover:opacity-85"
                >
                  Send enquiry
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
