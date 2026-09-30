import { createFileRoute, Link } from "@tanstack/react-router";
import { useGallery } from "@/lib/store";
import { getArtwork } from "@/data/artworks";
import { ArtworkCard } from "@/components/ArtworkCard";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Saved Artworks — LHR Art Galleries" },
      {
        name: "description",
        content: "The original paintings you have saved at LHR Art Galleries.",
      },
      { property: "og:title", content: "Saved Artworks | LHR Art Galleries" },
      { property: "og:description", content: "The paintings you have saved for later." },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist } = useGallery();
  const saved = wishlist
    .map((slug) => getArtwork(slug))
    .filter((a): a is NonNullable<ReturnType<typeof getArtwork>> => Boolean(a));

  return (
    <div className="pt-[68px] md:pt-20">
      <header className="gallery-container py-20 md:py-28">
        <p className="label-xs text-muted-foreground">Saved artworks</p>
        <h1 className="display-lg mt-6">
          {saved.length > 0 ? `${saved.length} saved` : "Nothing saved yet"}
        </h1>
      </header>

      <section className="gallery-container pb-24 md:pb-32">
        {saved.length === 0 ? (
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Tap the heart on any painting to keep it here while you decide.{" "}
            <Link to="/gallery" className="link-underline text-foreground">
              Browse the gallery
            </Link>
            .
          </p>
        ) : (
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3">
            {saved.map((artwork, i) => (
              <Reveal key={artwork.id} delay={(i % 3) * 80}>
                <ArtworkCard artwork={artwork} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
