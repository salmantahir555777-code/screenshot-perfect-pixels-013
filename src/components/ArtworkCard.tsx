import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { formatPKR, type Artwork } from "@/data/artworks";
import { useGallery } from "@/lib/store";

const ratio: Record<Artwork["orientation"], string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

export function ArtworkCard({ artwork }: { artwork: Artwork }) {
  const { toggleWishlist, isWishlisted } = useGallery();
  const saved = isWishlisted(artwork.slug);

  return (
    <article className="group relative">
      <Link to="/artwork/$slug" params={{ slug: artwork.slug }} className="block">
        <div className={`art-frame ${ratio[artwork.orientation]}`}>
          <img
            src={artwork.image}
            alt={`${artwork.title} — ${artwork.medium} by ${artwork.artist}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl leading-snug">{artwork.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{artwork.artist}</p>
            <p className="mt-3 label-xs text-muted-foreground">
              {artwork.medium} · {artwork.dimensions}
            </p>
            <p className="mt-2 text-sm">
              {artwork.availability === "Sold" ? (
                <span className="text-muted-foreground">Sold</span>
              ) : (
                formatPKR(artwork.price)
              )}
            </p>
          </div>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => toggleWishlist(artwork.slug)}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${artwork.title} from wishlist` : `Save ${artwork.title}`}
        className="absolute right-3 top-3 rounded-full bg-background/70 p-2 opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100 focus-visible:opacity-100 data-[saved=true]:opacity-100"
        data-saved={saved}
      >
        <Heart
          className={`h-4 w-4 ${saved ? "fill-accent text-accent" : "text-foreground"}`}
          strokeWidth={1}
        />
      </button>
    </article>
  );
}
