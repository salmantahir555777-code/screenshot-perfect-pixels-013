import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArtworkCard } from "@/components/ArtworkCard";
import { Reveal } from "@/components/Reveal";
import { artworksByArtist, getArtist } from "@/data/artists";

export const Route = createFileRoute("/artists/$slug")({
  loader: ({ params }) => {
    const artist = getArtist(params.slug);
    if (!artist) throw notFound();
    return { artist, works: artworksByArtist(params.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Artist unavailable | LHR Art Galleries" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { artist } = loaderData;
    const title = `${artist.name} — ${artist.style} | LHR Art Galleries`;
    return {
      meta: [
        { title },
        { name: "description", content: artist.bio.slice(0, 160) },
        { property: "og:title", content: title },
        { property: "og:description", content: artist.bio.slice(0, 160) },
      ],
    };
  },
  component: ArtistProfile,
});

function ArtistProfile() {
  const { artist, works } = Route.useLoaderData();
  const available = works.filter((w) => w.availability !== "Sold");

  return (
    <div className="pt-[68px] md:pt-20">
      <div className="gallery-container py-16 md:py-24">
        <Link to="/artists" className="label-xs link-underline text-muted-foreground">
          All artists
        </Link>

        <div className="mt-10 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="art-frame aspect-[4/5]">
            <img
              src={artist.portrait}
              alt={artist.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="label-xs text-muted-foreground">{artist.location}</p>
            <h1 className="display-lg mt-5">{artist.name}</h1>
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">{artist.bio}</p>
            <blockquote className="mt-10 border-l border-accent pl-6 font-[family-name:var(--font-display)] text-2xl italic">
              “{artist.philosophy}”
            </blockquote>
            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              <div>
                <p className="label-xs text-muted-foreground">Specialisation</p>
                <p className="mt-3 text-sm">{artist.style}</p>
              </div>
              <div>
                <p className="label-xs text-muted-foreground">Works in gallery</p>
                <p className="mt-3 text-sm">{works.length}</p>
              </div>
            </div>
            <div className="mt-10">
              <p className="label-xs text-muted-foreground">Exhibitions</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {artist.exhibitions.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section className="border-t border-border py-20 md:py-28">
        <div className="gallery-container">
          <h2 className="display-md">Available works</h2>
          <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {(available.length ? available : works).map((a, i) => (
              <Reveal key={a.id} delay={(i % 3) * 80}>
                <ArtworkCard artwork={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
