import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ArtworkCard } from "@/components/ArtworkCard";
import { Newsletter } from "@/components/Newsletter";
import { artworks } from "@/data/artworks";
import { collections } from "@/data/collections";
import { artists } from "@/data/artists";
import heroPainting from "@/assets/art-lahore-dusk.jpg";
import sufiEvening from "@/assets/art-sufi-evening.jpg";
import lahoreAfterRain from "@/assets/art-lahore-after-rain.jpg";
import interiorRoom from "@/assets/interior-living-room.jpg";
import studio from "@/assets/studio-commission.jpg";
import stillLife from "@/assets/art-crimson-still-life.jpg";
import abstractQuiet from "@/assets/art-abstract-quiet.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LHR Art Galleries | Original Oil Paintings & Fine Art" },
      {
        name: "description",
        content:
          "Original oil paintings curated for collectors, interiors and inspired living. Portraits, landscapes, abstracts and Pakistani fine art from Lahore.",
      },
      { property: "og:title", content: "LHR Art Galleries | Where Art Finds Its Place" },
      {
        property: "og:description",
        content:
          "Discover original oil paintings and collectible fine art from a curated Lahore gallery.",
      },
    ],
  }),
  component: Home,
});

const editorial = [
  { title: "How to Choose Art for Your Home", tag: "Guide", image: interiorRoom },
  { title: "Understanding Oil Painting", tag: "Craft", image: stillLife },
  { title: "Inside the Studio", tag: "Artists", image: studio },
  { title: "Art as an Investment", tag: "Collecting", image: abstractQuiet },
];

function Home() {
  const featured = artworks.filter((a) => a.availability === "Available").slice(0, 8);
  const lahore = artworks.filter((a) => a.category === "Pakistani Art").slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative h-dvh min-h-[620px] w-full overflow-hidden">
        <img
          src={heroPainting}
          alt="Whispers of Lahore — oil on canvas by Ahmed Khan"
          width={1920}
          height={1200}
          className="hero-zoom absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/50" />
        <div className="gallery-container relative flex h-full flex-col justify-end pb-20 text-ink-foreground md:pb-28">
          <p className="label-xs opacity-80">Lahore · Est. 2026</p>
          <h1 className="display-xl mt-6 max-w-4xl">Art that lives beyond the canvas.</h1>
          <p className="mt-8 max-w-md text-sm leading-relaxed opacity-85">
            Discover original oil paintings curated for collectors, interiors, and inspired
            living.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/gallery"
              className="label-xs bg-background px-8 py-4 text-foreground transition-opacity hover:opacity-85"
            >
              Explore Gallery
            </Link>
            <Link
              to="/collections"
              className="label-xs border border-current px-8 py-4 transition-colors hover:bg-ink-foreground hover:text-ink"
            >
              View Collections
            </Link>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="py-24 md:py-40">
        <div className="gallery-container grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <Reveal>
            <p className="label-xs text-muted-foreground">Curated with purpose</p>
            <h2 className="display-lg mt-8 max-w-2xl">
              Paintings chosen to transform spaces, preserve stories, and inspire emotion.
            </h2>
            <p className="mt-10 max-w-lg text-sm leading-relaxed text-muted-foreground">
              LHR Art Galleries brings together original works from painters across Pakistan —
              from classical portraiture and Mughal architecture to quiet abstraction. Every
              canvas is an original, documented, and accompanied by a certificate of
              authenticity.
            </p>
            <Link to="/about" className="mt-10 inline-flex label-xs link-underline">
              Our philosophy
            </Link>
          </Reveal>
          <Reveal delay={150} className="art-frame aspect-[4/5]">
            <img
              src={lahoreAfterRain}
              alt="Lahore After Rain — oil on canvas"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* COLLECTIONS — asymmetric editorial grid */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="gallery-container">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display-md">Explore the collections</h2>
            <Link to="/collections" className="label-xs link-underline">
              All collections
            </Link>
          </Reveal>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            <Reveal className="lg:row-span-2">
              <CollectionTile collection={collections[6]!} tall />
            </Reveal>
            <Reveal delay={100}>
              <CollectionTile collection={collections[0]!} />
            </Reveal>
            <Reveal delay={200}>
              <CollectionTile collection={collections[1]!} />
            </Reveal>
            <Reveal delay={150} className="lg:col-span-2">
              <CollectionTile collection={collections[2]!} wide />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FEATURED ARTWORKS */}
      <section className="py-24 md:py-32">
        <div className="gallery-container">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display-md">Featured artworks</h2>
            <Link to="/gallery" className="label-xs link-underline">
              View all artworks
            </Link>
          </Reveal>
          <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((artwork, i) => (
              <Reveal key={artwork.id} delay={(i % 4) * 90}>
                <ArtworkCard artwork={artwork} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* THE SOUL OF LAHORE */}
      <section className="bg-ink py-24 text-ink-foreground md:py-36">
        <div className="gallery-container">
          <Reveal className="max-w-2xl">
            <p className="label-xs opacity-70">Art from Pakistan</p>
            <h2 className="display-lg mt-8">The Soul of Lahore</h2>
            <p className="mt-8 text-sm leading-relaxed opacity-80">
              Badshahi at dusk, the walled city after rain, evening gatherings at the shrine.
              A collection of paintings that reads the city as a living subject rather than a
              monument.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {lahore.map((a, i) => (
              <Reveal key={a.id} delay={i * 120}>
                <Link to="/artwork/$slug" params={{ slug: a.slug }} className="group block">
                  <div className="art-frame aspect-[3/4]">
                    <img
                      src={a.image}
                      alt={a.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="mt-5 text-xl">{a.title}</p>
                  <p className="mt-1 text-sm opacity-70">{a.artist}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14">
            <Link
              to="/gallery"
              search={{ category: "Pakistani Art" }}
              className="label-xs inline-flex items-center gap-3 border border-current px-8 py-4 transition-colors hover:bg-ink-foreground hover:text-ink"
            >
              Explore Lahore Collection <ArrowRight className="h-4 w-4" strokeWidth={1} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ARTISTS */}
      <section className="py-24 md:py-36">
        <div className="gallery-container">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display-md">Meet the artists</h2>
            <Link to="/artists" className="label-xs link-underline">
              All artists
            </Link>
          </Reveal>
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {artists.slice(0, 3).map((artist, i) => (
              <Reveal key={artist.slug} delay={i * 110}>
                <Link
                  to="/artists/$slug"
                  params={{ slug: artist.slug }}
                  className="group block"
                >
                  <div className="art-frame aspect-[4/3]">
                    <img
                      src={artist.portrait}
                      alt={artist.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="mt-6 text-2xl">{artist.name}</h3>
                  <p className="mt-2 label-xs text-muted-foreground">{artist.location}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {artist.bio.slice(0, 120)}…
                  </p>
                  <span className="mt-5 inline-flex label-xs link-underline">View artist</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ART FOR YOUR SPACE */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="gallery-container grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal className="art-frame aspect-[4/3]">
            <img
              src={interiorRoom}
              alt="Original oil landscape hanging above a linen sofa in a warm minimal living room"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="label-xs text-muted-foreground">Art for your space</p>
            <h2 className="display-md mt-6">A painting changes a room before anything else.</h2>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
              Scale, light and tone matter as much as subject. Tell us about your wall and we
              will suggest works that hold it — from intimate studies to oversized statements.
            </p>
            <Link
              to="/contact"
              className="mt-10 inline-flex label-xs bg-ink px-8 py-4 text-ink-foreground transition-opacity hover:opacity-85"
            >
              Find art for your space
            </Link>
          </Reveal>
        </div>
      </section>

      {/* COMMISSION */}
      <section className="relative overflow-hidden">
        <img
          src={studio}
          alt="An artist's studio in Lahore with a canvas on the easel"
          loading="lazy"
          className="h-[520px] w-full object-cover md:h-[620px]"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="gallery-container absolute inset-0 flex flex-col justify-center text-ink-foreground">
          <Reveal className="max-w-xl">
            <p className="label-xs opacity-75">Commission a painting</p>
            <h2 className="display-lg mt-6">Have a work made for you.</h2>
            <p className="mt-6 text-sm leading-relaxed opacity-85">
              Portraits, family and wedding commissions, landscapes and cultural scenes — made
              with you, in the artist's own hand.
            </p>
            <Link
              to="/commission"
              className="mt-10 inline-flex label-xs bg-background px-8 py-4 text-foreground transition-opacity hover:opacity-85"
            >
              Start a commission
            </Link>
          </Reveal>
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="py-24 md:py-32">
        <div className="gallery-container">
          <Reveal>
            <h2 className="display-md">The world of art</h2>
          </Reveal>
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {editorial.map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <article className="group">
                  <div className="art-frame aspect-[3/4]">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="mt-5 label-xs text-muted-foreground">{item.tag}</p>
                  <h3 className="mt-3 text-xl leading-snug">{item.title}</h3>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHENTICITY */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="gallery-container">
          <Reveal className="max-w-3xl">
            <h2 className="display-md">Every canvas has a story.</h2>
          </Reveal>
          <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: "Original works only",
                d: "No prints, no reproductions. Each painting exists once.",
              },
              {
                t: "Certificate of authenticity",
                d: "Signed documentation of artist, medium, dimensions and year.",
              },
              {
                t: "Artist relationships",
                d: "Works are acquired directly from painters we know and visit.",
              },
              {
                t: "Protective delivery",
                d: "Corner-guarded, crated and tracked from gallery to door.",
              },
            ].map((item, i) => (
              <Reveal key={item.t} delay={i * 80}>
                <p className="label-xs text-accent">0{i + 1}</p>
                <h3 className="mt-5 text-xl">{item.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}

function CollectionTile({
  collection,
  tall,
  wide,
}: {
  collection: (typeof collections)[number];
  tall?: boolean;
  wide?: boolean;
}) {
  return (
    <Link
      to="/gallery"
      search={{ category: collection.category }}
      className="group relative block h-full"
    >
      <div
        className={`art-frame ${tall ? "aspect-[3/4] lg:h-full" : wide ? "aspect-[16/9]" : "aspect-[4/3]"}`}
      >
        <img
          src={collection.image}
          alt={`${collection.name} collection`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/15 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      </div>
      <div className="absolute bottom-0 left-0 p-7 text-ink-foreground">
        <h3 className="font-[family-name:var(--font-display)] text-3xl">{collection.name}</h3>
        <p className="mt-2 flex items-center gap-3 text-sm opacity-0 transition-all duration-500 group-hover:opacity-90">
          {collection.blurb}
          <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1} />
        </p>
      </div>
    </Link>
  );
}
