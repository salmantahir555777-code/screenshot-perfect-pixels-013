import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import studio from "@/assets/studio-commission.jpg";
import lahoreAfterRain from "@/assets/art-lahore-after-rain.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — LHR Art Galleries" },
      {
        name: "description",
        content:
          "The story and philosophy behind LHR Art Galleries: original oil paintings, curated in Lahore for collectors and inspired interiors.",
      },
      { property: "og:title", content: "About | LHR Art Galleries" },
      {
        property: "og:description",
        content: "Original oil paintings, curated in Lahore for collectors and inspired interiors.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="pt-[68px] md:pt-20">
      <header className="gallery-container py-20 md:py-28">
        <p className="label-xs text-muted-foreground">About the gallery</p>
        <h1 className="display-lg mt-6 max-w-3xl">
          Where art finds its place.
        </h1>
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
          LHR Art Galleries is a curated gallery of original oil paintings, based in Lahore and
          showing painters from across Pakistan. We represent a small number of artists, know
          their studios, and sell each work exactly once.
        </p>
      </header>

      <section className="gallery-container grid gap-10 pb-24 md:grid-cols-2 md:pb-32">
        <Reveal className="art-frame aspect-[4/3]">
          <img
            src={studio}
            alt="Inside a Lahore artist's studio"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </Reveal>
        <Reveal delay={120} className="art-frame aspect-[4/3]">
          <img
            src={lahoreAfterRain}
            alt="Lahore After Rain — oil on canvas"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </Reveal>
      </section>

      <section className="border-t border-border py-24 md:py-32">
        <div className="gallery-container grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <h2 className="display-md">Our philosophy</h2>
          </Reveal>
          <Reveal delay={100} className="space-y-8 text-sm leading-relaxed text-muted-foreground">
            <p>
              We believe a painting is bought for a wall, not for a portfolio. Every work we show
              is chosen the way an interior designer chooses: for its light, its scale and the
              quiet it brings to a room.
            </p>
            <p>
              Nothing here is printed, reproduced or made in a workshop. Each canvas is painted
              by hand, documented with a certificate of authenticity, and delivered crated and
              tracked from the gallery to your door.
            </p>
            <p>
              We work directly with the artists — visiting studios in Lahore, Kasur and
              Islamabad — so the painters receive the majority of every sale, and collectors
              know exactly whose hand made the work.
            </p>
            <Link to="/artists" className="inline-flex label-xs link-underline text-foreground">
              Meet the artists
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-24 text-ink-foreground md:py-32">
        <div className="gallery-container grid gap-12 sm:grid-cols-3">
          {[
            { n: "06", t: "Represented painters" },
            { n: "20+", t: "Original works in the collection" },
            { n: "100%", t: "Hand-painted originals only" },
          ].map((s, i) => (
            <Reveal key={s.t} delay={i * 100}>
              <p className="font-[family-name:var(--font-display)] text-5xl font-light">{s.n}</p>
              <p className="mt-4 label-xs opacity-70">{s.t}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
