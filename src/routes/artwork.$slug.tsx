import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Heart } from "lucide-react";
import { artworks, formatPKR, getArtwork } from "@/data/artworks";
import { useGallery } from "@/lib/store";
import { ArtworkCard } from "@/components/ArtworkCard";
import { Reveal } from "@/components/Reveal";

const FRAMES = ["Unframed", "Natural Wood", "Black Wood", "Gold Frame"] as const;

export const Route = createFileRoute("/artwork/$slug")({
  loader: ({ params }) => {
    const artwork = getArtwork(params.slug);
    if (!artwork) throw notFound();
    return { artwork };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Artwork unavailable | LHR Art Galleries" }, { name: "robots", content: "noindex" }],
      };
    }
    const { artwork } = loaderData;
    const title = `${artwork.title} by ${artwork.artist} | LHR Art Galleries`;
    return {
      meta: [
        { title },
        { name: "description", content: artwork.description.slice(0, 160) },
        { property: "og:title", content: title },
        { property: "og:description", content: artwork.description.slice(0, 160) },
      ],
    };
  },
  component: ArtworkDetail,
});

function ArtworkDetail() {
  const { artwork } = Route.useLoaderData();
  const { addToCart, toggleWishlist, isWishlisted } = useGallery();
  const navigate = useNavigate();
  const [frame, setFrame] = useState<string>("Unframed");
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const saved = isWishlisted(artwork.slug);
  const sold = artwork.availability === "Sold";

  const related = artworks
    .filter((a) => a.slug !== artwork.slug && a.category === artwork.category)
    .slice(0, 4);

  return (
    <div className="pt-[68px] md:pt-20">
      <div className="gallery-container py-12 md:py-20">
        <Link to="/gallery" className="label-xs link-underline text-muted-foreground">
          Back to gallery
        </Link>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div className="art-frame bg-cream p-4 md:p-10">
            <img
              src={artwork.image}
              alt={`${artwork.title} — ${artwork.medium}, ${artwork.dimensions}, by ${artwork.artist}`}
              className="h-full w-full object-contain shadow-[var(--shadow-frame)]"
            />
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="label-xs text-muted-foreground">{artwork.category}</p>
            <h1 className="display-md mt-5">{artwork.title}</h1>
            <Link
              to="/artists/$slug"
              params={{ slug: artwork.artistSlug }}
              className="mt-3 inline-flex text-sm link-underline text-muted-foreground"
            >
              {artwork.artist}
            </Link>

            <p className="mt-8 text-2xl font-[family-name:var(--font-display)]">
              {sold ? "Sold" : formatPKR(artwork.price)}
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-y-5 border-y border-border py-8 text-sm">
              <dt className="label-xs text-muted-foreground">Medium</dt>
              <dd>{artwork.medium}</dd>
              <dt className="label-xs text-muted-foreground">Dimensions</dt>
              <dd>{artwork.dimensions}</dd>
              <dt className="label-xs text-muted-foreground">Year</dt>
              <dd>{artwork.year}</dd>
              <dt className="label-xs text-muted-foreground">Availability</dt>
              <dd>{artwork.availability}</dd>
            </dl>

            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              {artwork.description}
            </p>

            <fieldset className="mt-10">
              <legend className="label-xs text-muted-foreground">Frame options</legend>
              <div className="mt-4 flex flex-wrap gap-3">
                {FRAMES.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFrame(option)}
                    aria-pressed={frame === option}
                    className={`label-xs border px-4 py-3 transition-colors ${
                      frame === option
                        ? "border-accent text-accent"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-10 flex flex-col gap-3">
              <button
                type="button"
                disabled={sold}
                onClick={() => addToCart(artwork.slug)}
                className="label-xs bg-ink px-6 py-4 text-ink-foreground transition-opacity hover:opacity-85 disabled:opacity-40"
              >
                {sold ? "This work has sold" : "Add to cart"}
              </button>
              <button
                type="button"
                disabled={sold}
                onClick={() => {
                  addToCart(artwork.slug);
                  navigate({ to: "/checkout" });
                }}
                className="label-xs border border-border px-6 py-4 transition-colors hover:bg-cream disabled:opacity-40"
              >
                Buy now
              </button>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setInquiryOpen((v) => !v)}
                  className="label-xs flex-1 border border-border px-6 py-4 transition-colors hover:bg-cream"
                >
                  Inquire about artwork
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(artwork.slug)}
                  aria-pressed={saved}
                  aria-label={saved ? "Remove from saved artworks" : "Save artwork"}
                  className="border border-border px-5 transition-colors hover:bg-cream"
                >
                  <Heart
                    className={`h-4 w-4 ${saved ? "fill-accent text-accent" : ""}`}
                    strokeWidth={1}
                  />
                </button>
              </div>
            </div>

            {inquiryOpen && (
              <div className="mt-8 border border-border p-6">
                {sent ? (
                  <p className="text-sm text-muted-foreground">
                    Thank you. A gallery advisor will reply about “{artwork.title}” shortly.
                  </p>
                ) : (
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                  >
                    <p className="label-xs text-muted-foreground">
                      Inquiry — {artwork.title}
                    </p>
                    <Field label="Name" name="name" />
                    <Field label="Email" name="email" type="email" />
                    <Field label="Phone" name="phone" type="tel" required={false} />
                    <div>
                      <label htmlFor="message" className="label-xs text-muted-foreground">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={3}
                        className="mt-2 w-full border-b border-border bg-transparent pb-2 text-sm outline-none focus:border-accent"
                      />
                    </div>
                    <label className="flex items-center gap-3 text-sm text-muted-foreground">
                      <input type="checkbox" className="accent-[var(--color-accent)]" />I am
                      interested in commissioning a similar work.
                    </label>
                    <button
                      type="submit"
                      className="label-xs bg-ink px-6 py-3 text-ink-foreground"
                    >
                      Send inquiry
                    </button>
                  </form>
                )}
              </div>
            )}

            <ul className="mt-10 space-y-2 text-sm text-muted-foreground">
              <li>Certificate of authenticity included.</li>
              <li>Crated and insured delivery within Pakistan and worldwide.</li>
              <li>Local Lahore delivery and installation on request.</li>
            </ul>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-border py-20 md:py-28">
          <div className="gallery-container">
            <h2 className="display-md">Related works</h2>
            <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((a, i) => (
                <Reveal key={a.id} delay={i * 80}>
                  <ArtworkCard artwork={a} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="label-xs text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full border-b border-border bg-transparent pb-2 text-sm outline-none focus:border-accent"
      />
    </div>
  );
}
