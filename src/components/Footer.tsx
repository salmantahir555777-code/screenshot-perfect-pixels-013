import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-cream">
      <div className="gallery-container py-20 md:py-28">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-[family-name:var(--font-display)] text-3xl">LHR ART GALLERIES</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A curated digital gallery of original oil paintings and contemporary fine art,
              based in Lahore, Pakistan.
            </p>
            <p className="mt-8 label-xs text-muted-foreground">Where Art Finds Its Place.</p>
          </div>

          <nav aria-label="Gallery">
            <p className="label-xs text-muted-foreground">Gallery</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <Link to="/gallery" className="link-underline">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/collections" className="link-underline">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/artists" className="link-underline">
                  Artists
                </Link>
              </li>
              <li>
                <Link to="/about" className="link-underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/commission" className="link-underline">
                  Commission Art
                </Link>
              </li>
              <li>
                <Link to="/contact" className="link-underline">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Customer care">
            <p className="label-xs text-muted-foreground">Customer Care</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <Link to="/information" hash="shipping" className="link-underline">
                  Shipping
                </Link>
              </li>
              <li>
                <Link to="/information" hash="returns" className="link-underline">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/information" hash="authenticity" className="link-underline">
                  Authenticity
                </Link>
              </li>
              <li>
                <Link to="/information" hash="faq" className="link-underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="link-underline">
                  Saved Artworks
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <p className="label-xs text-muted-foreground">© 2026 LHR Art Galleries</p>
          <ul className="flex gap-8">
            {["Instagram", "Facebook", "Pinterest"].map((s) => (
              <li key={s}>
                <a href="#" className="label-xs link-underline text-muted-foreground">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
