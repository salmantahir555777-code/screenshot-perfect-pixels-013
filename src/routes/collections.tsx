import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { collections } from "@/data/collections";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections | LHR Art Galleries" },
      {
        name: "description",
        content:
          "Eight curated collections of original painting: abstract, portraits, landscapes, still life, contemporary, traditional, Pakistani art and classical works.",
      },
      { property: "og:title", content: "Curated Collections | LHR Art Galleries" },
      {
        property: "og:description",
        content: "Explore original oil paintings grouped by subject and sensibility.",
      },
    ],
  }),
  component: Collections,
});

function Collections() {
  return (
    <div className="pt-[68px] md:pt-20">
      <header className="gallery-container py-20 md:py-28">
        <p className="label-xs text-muted-foreground">Curated collections</p>
        <h1 className="display-lg mt-6 max-w-3xl">Explore the collections</h1>
        <p className="mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Each collection is assembled slowly, around a subject rather than a trend.
        </p>
      </header>

      <div className="gallery-container grid gap-6 pb-28 md:grid-cols-2">
        {collections.map((collection, i) => (
          <Reveal key={collection.name} delay={(i % 2) * 90}>
            <Link
              to="/gallery"
              search={{ category: collection.category }}
              className="group relative block"
            >
              <div className={`art-frame ${i % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
                <img
                  src={collection.image}
                  alt={`${collection.name} collection`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-ink/15 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              </div>
              <div className="absolute bottom-0 left-0 p-8 text-ink-foreground">
                <h2 className="font-[family-name:var(--font-display)] text-4xl">
                  {collection.name}
                </h2>
                <p className="mt-3 flex items-center gap-3 text-sm opacity-0 transition-opacity duration-500 group-hover:opacity-90">
                  {collection.blurb}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                    strokeWidth={1}
                  />
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
