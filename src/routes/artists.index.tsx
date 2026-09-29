import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { artists, artworksByArtist } from "@/data/artists";

export const Route = createFileRoute("/artists/")({
  head: () => ({
    meta: [
      { title: "Artists | LHR Art Galleries" },
      {
        name: "description",
        content:
          "Meet the painters behind the collection — portraitists, landscape painters and abstractionists working in Lahore, Islamabad and rural Punjab.",
      },
      { property: "og:title", content: "Meet the Artists | LHR Art Galleries" },
      {
        property: "og:description",
        content: "Biographies, philosophies and available works from our represented painters.",
      },
    ],
  }),
  component: Artists,
});

function Artists() {
  return (
    <div className="pt-[68px] md:pt-20">
      <header className="gallery-container py-20 md:py-28">
        <p className="label-xs text-muted-foreground">Represented painters</p>
        <h1 className="display-lg mt-6">Meet the artists</h1>
      </header>

      <div className="gallery-container grid gap-14 pb-28 sm:grid-cols-2 lg:grid-cols-3">
        {artists.map((artist, i) => (
          <Reveal key={artist.slug} delay={(i % 3) * 90}>
            <Link to="/artists/$slug" params={{ slug: artist.slug }} className="group block">
              <div className="art-frame aspect-[4/5]">
                <img
                  src={artist.portrait}
                  alt={artist.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="mt-6 text-2xl">{artist.name}</h2>
              <p className="mt-2 label-xs text-muted-foreground">{artist.style}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {artist.bio.slice(0, 130)}…
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                {artist.location} · {artworksByArtist(artist.slug).length} works
              </p>
              <span className="mt-5 inline-flex label-xs link-underline">View artist</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
