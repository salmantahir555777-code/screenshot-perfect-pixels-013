import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ArtworkCard } from "@/components/ArtworkCard";
import {
  artworks,
  AVAILABILITIES,
  CATEGORIES,
  MEDIUMS,
  PRICE_BANDS,
  SIZES,
} from "@/data/artworks";

type GallerySearch = { category?: string | undefined };

export const Route = createFileRoute("/gallery")({
  validateSearch: (search: Record<string, unknown>): GallerySearch => ({
    category: typeof search["category"] === "string" ? search["category"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Gallery — Original Oil Paintings | LHR Art Galleries" },
      {
        name: "description",
        content:
          "Browse every available original painting: portraits, landscapes, abstracts, still life and Pakistani fine art, filtered by category, medium, size and price.",
      },
      { property: "og:title", content: "The Gallery | LHR Art Galleries" },
      {
        property: "og:description",
        content: "Every available original painting, filterable by category, medium and price.",
      },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const { category } = Route.useSearch();
  const navigate = useNavigate({ from: "/gallery" });
  const [medium, setMedium] = useState<string | undefined>();
  const [size, setSize] = useState<string | undefined>();
  const [band, setBand] = useState<string | undefined>();
  const [availability, setAvailability] = useState<string | undefined>();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(
    () =>
      artworks.filter((a) => {
        if (category && a.category !== category) return false;
        if (medium && a.medium !== medium) return false;
        if (size && a.size !== size) return false;
        if (availability && a.availability !== availability) return false;
        if (band) {
          const range = PRICE_BANDS.find((p) => p.label === band);
          if (range && (a.price < range.min || a.price >= range.max)) return false;
        }
        return true;
      }),
    [category, medium, size, band, availability],
  );

  const setCategory = (value?: string) =>
    navigate({ search: { category: value }, replace: true });

  const clearAll = () => {
    setMedium(undefined);
    setSize(undefined);
    setBand(undefined);
    setAvailability(undefined);
    setCategory(undefined);
  };

  const filterGroups = [
    { label: "Category", options: [...CATEGORIES], value: category, set: setCategory },
    { label: "Medium", options: [...MEDIUMS], value: medium, set: setMedium },
    { label: "Size", options: [...SIZES], value: size, set: setSize },
    { label: "Price", options: PRICE_BANDS.map((p) => p.label), value: band, set: setBand },
    {
      label: "Availability",
      options: [...AVAILABILITIES],
      value: availability,
      set: setAvailability,
    },
  ];

  return (
    <div className="pt-[68px] md:pt-20">
      <header className="gallery-container py-20 md:py-28">
        <p className="label-xs text-muted-foreground">The collection</p>
        <h1 className="display-lg mt-6">{category ?? "All artworks"}</h1>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
          {results.length} original {results.length === 1 ? "work" : "works"}, each painted by
          hand and sold once.
        </p>
      </header>

      <div className="gallery-container flex items-center justify-between border-y border-border py-4 lg:hidden">
        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="label-xs inline-flex items-center gap-3"
        >
          <SlidersHorizontal className="h-4 w-4" strokeWidth={1} /> Filters
        </button>
        <button type="button" onClick={clearAll} className="label-xs text-muted-foreground">
          Clear
        </button>
      </div>

      <div className="gallery-container grid gap-12 py-14 lg:grid-cols-[220px_1fr] lg:gap-16">
        {/* Desktop filters */}
        <aside className="hidden lg:block">
          <FilterPanel groups={filterGroups} onClear={clearAll} />
        </aside>

        {/* Mobile filter drawer */}
        <div
          className={`fixed inset-0 z-[75] bg-background transition-opacity duration-500 lg:hidden ${
            filtersOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={!filtersOpen}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-5">
            <span className="label-xs">Refine</span>
            <button type="button" aria-label="Close filters" onClick={() => setFiltersOpen(false)}>
              <X className="h-5 w-5" strokeWidth={1} />
            </button>
          </div>
          <div className="h-[calc(100dvh-64px)] overflow-y-auto px-5 py-8">
            <FilterPanel groups={filterGroups} onClear={clearAll} />
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="label-xs mt-10 w-full bg-ink px-6 py-4 text-ink-foreground"
            >
              Show {results.length} artworks
            </button>
          </div>
        </div>

        <section>
          {results.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No artworks match these filters yet.
            </p>
          ) : (
            <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((artwork, i) => (
                <Reveal key={artwork.id} delay={(i % 3) * 80}>
                  <ArtworkCard artwork={artwork} />
                </Reveal>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function FilterPanel({
  groups,
  onClear,
}: {
  groups: {
    label: string;
    options: string[];
    value: string | undefined;
    set: (v?: string) => void | Promise<void>;
  }[];
  onClear: () => void;
}) {
  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <div key={group.label}>
          <p className="label-xs text-muted-foreground">{group.label}</p>
          <ul className="mt-4 space-y-2">
            {group.options.map((option) => {
              const active = group.value === option;
              return (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => group.set(active ? undefined : option)}
                    aria-pressed={active}
                    className={`text-sm transition-colors ${
                      active ? "text-accent" : "text-foreground hover:text-accent"
                    }`}
                  >
                    {option}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <button type="button" onClick={onClear} className="label-xs link-underline">
        Clear all
      </button>
    </div>
  );
}
