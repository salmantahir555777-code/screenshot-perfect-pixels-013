import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { artworks, formatPKR } from "@/data/artworks";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) setQuery("");
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return artworks
      .filter((a) =>
        [a.title, a.artist, a.category, a.medium].join(" ").toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [query]);

  return (
    <div
      className={`fixed inset-0 z-[70] bg-background transition-opacity duration-500 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
      role="dialog"
      aria-label="Search artworks"
    >
      <div className="gallery-container flex h-[68px] items-center justify-between md:h-20">
        <span className="label-xs text-muted-foreground">Search</span>
        <button type="button" aria-label="Close search" onClick={onClose}>
          <X className="h-5 w-5" strokeWidth={1} />
        </button>
      </div>
      <div className="gallery-container pt-8">
        <input
          autoFocus={open}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by artwork, artist, category or medium"
          className="w-full border-b border-border bg-transparent pb-6 font-[family-name:var(--font-display)] text-3xl font-light outline-none placeholder:text-muted-foreground focus:border-accent md:text-5xl"
        />
        <div className="mt-10 max-h-[60vh] overflow-y-auto">
          {query && results.length === 0 && (
            <p className="text-sm text-muted-foreground">No artworks match “{query}”.</p>
          )}
          <ul className="divide-y divide-border">
            {results.map((a) => (
              <li key={a.id}>
                <Link
                  to="/artwork/$slug"
                  params={{ slug: a.slug }}
                  onClick={onClose}
                  className="group flex items-center gap-6 py-5"
                >
                  <div className="art-frame h-20 w-16 shrink-0">
                    <img
                      src={a.image}
                      alt={a.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xl">{a.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {a.artist} · {a.category}
                    </p>
                  </div>
                  <span className="label-xs text-muted-foreground">{formatPKR(a.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
