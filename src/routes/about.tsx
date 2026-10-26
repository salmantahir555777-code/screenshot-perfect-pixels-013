import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { artists } from "@/data/artists";
import lahoreDusk from "@/assets/art-lahore-dusk.jpg";
import punjabFields from "@/assets/art-punjab-fields.jpg";

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

      {/* Story — text first, images organised with captions */}
      <section className="gallery-container grid gap-14 pb-24 md:pb-32 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="label-xs text-muted-foreground">The gallery</p>
          <h2 className="display-md mt-4 max-w-md">
            One wall, one painting, one owner at a time.
          </h2>
          <div className="mt-8 max-w-md space-y-6 text-sm leading-relaxed text-muted-foreground">
            <p>
              LHR Art Galleries began in a single room in Lahore with one rule: show only what we
              would hang in our own homes. Every canvas is visited in the studio, lived with for
              weeks, and accepted only when its light, scale and quiet still hold.
            </p>
            <p>
              We represent six painters working in Lahore, Kasur and Islamabad, and we buy
              directly from them — no middlemen, no workshops. Each work is painted by hand,
              documented with a certificate of authenticity, and retired from the gallery the
              moment it sells.
            </p>
            <p>
              Alongside the collection we advise collectors and interior designers: seeing a
              painting in your own room's light before you commit is part of how we sell, not an
              extra.
            </p>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              { n: "2019", t: "Founded in Lahore" },
              { n: "06", t: "Represented painters" },
              { n: "36", t: "Original works shown" },
            ].map((f) => (
              <div key={f.t}>
                <dt className="font-[family-name:var(--font-display)] text-2xl font-light">
                  {f.n}
                </dt>
                <dd className="mt-2 label-xs text-muted-foreground">{f.t}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="grid gap-10 sm:grid-cols-[1.15fr_0.85fr] sm:items-start">
          <Reveal>
            <figure>
              <div className="art-frame aspect-[4/5]">
                <img
                  src={lahoreDusk}
                  alt="Whispers of Lahore — oil on canvas"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                <span className="text-sm">Whispers of Lahore</span>
                <span className="label-xs text-muted-foreground">Ahmed Khan</span>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={140} className="sm:mt-16">
            <figure>
              <div className="art-frame aspect-[3/4]">
                <img
                  src={punjabFields}
                  alt="Punjab Fields — oil on canvas"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                <span className="text-sm">Punjab Fields</span>
                <span className="label-xs text-muted-foreground">Ali Raza</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="gallery-container">
          <Reveal>
            <p className="label-xs text-muted-foreground">How it works</p>
            <h2 className="display-md mt-4 max-w-xl">
              From the studio to your wall.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
            {[
              {
                n: "01",
                t: "Choose quietly",
                d: "Browse the collection online or book a viewing in Lahore. Every painting is photographed in daylight, and we will happily send additional detail shots or hang it in your room's light before you decide.",
              },
              {
                n: "02",
                t: "Papered and prepared",
                d: "Each work leaves with its certificate of authenticity, signed by the artist and the gallery. If you need it, we advise on framing and can deliver ready to hang.",
              },
              {
                n: "03",
                t: "Crated and delivered",
                d: "Paintings travel crated, insured and tracked from the gallery to your door, across Pakistan and worldwide. Once delivered, the work is retired from the collection for good.",
              },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <p className="font-[family-name:var(--font-display)] text-3xl font-light text-muted-foreground">
                  {s.n}
                </p>
                <h3 className="mt-5 text-lg">{s.t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The painters */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="gallery-container">
          <Reveal>
            <p className="label-xs text-muted-foreground">The painters</p>
            <h2 className="display-md mt-4">The artists behind the work</h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {artists.map((artist, i) => (
              <Reveal key={artist.slug} delay={(i % 6) * 70}>
                <Link
                  to="/artists/$slug"
                  params={{ slug: artist.slug }}
                  className="group block"
                >
                  <div className="art-frame aspect-[4/5]">
                    <img
                      src={artist.portrait}
                      alt={artist.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-sm">{artist.name}</h3>
                  <p className="mt-1 label-xs text-muted-foreground">
                    {artist.location.split(",")[0]}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={150}>
            <Link
              to="/artists"
              className="mt-12 inline-flex label-xs link-underline text-foreground"
            >
              Meet the artists
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
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
    </div>
  );
}
