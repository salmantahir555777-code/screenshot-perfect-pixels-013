import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useGallery } from "@/lib/store";
import { SearchOverlay } from "./SearchOverlay";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Gallery", to: "/gallery" },
  { label: "Collections", to: "/collections" },
  { label: "Artists", to: "/artists" },
  { label: "About", to: "/about" },
] as const;

const MOBILE_NAV = [
  { label: "Home", to: "/" },
  { label: "Gallery", to: "/gallery" },
  { label: "Collections", to: "/collections" },
  { label: "Artists", to: "/artists" },
  { label: "Pakistani Art", to: "/gallery" },
  { label: "Commission Art", to: "/commission" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount, setCartOpen, wishlist } = useGallery();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overlayHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const solid = scrolled || !overlayHero;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-700 ${
          solid
            ? "border-b border-border bg-background/92 backdrop-blur-md"
            : "border-b border-transparent"
        } ${!solid && !menuOpen ? "text-ink-foreground" : "text-foreground"}`}
      >
        <div className="gallery-container flex h-[68px] items-center justify-between md:h-20">
          <Link to="/" className="label-xs tracking-[0.3em]">
            LHR ART GALLERIES
          </Link>

          <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="label-xs link-underline"
                data-active={pathname === item.to}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button
              type="button"
              aria-label="Search artworks"
              onClick={() => setSearchOpen(true)}
              className="transition-opacity hover:opacity-60"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1} />
            </button>
            <Link
              to="/wishlist"
              aria-label="Saved artworks"
              className="relative hidden transition-opacity hover:opacity-60 sm:block"
            >
              <Heart className="h-[18px] w-[18px]" strokeWidth={1} />
              {wishlist.length > 0 && (
                <span className="absolute -right-2 -top-1 text-[10px]">{wishlist.length}</span>
              )}
            </Link>
            <Link
              to="/account"
              aria-label="Account"
              className="hidden transition-opacity hover:opacity-60 sm:block"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1} />
            </Link>
            <button
              type="button"
              aria-label={`Cart, ${cartCount} items`}
              onClick={() => setCartOpen(true)}
              className="relative transition-opacity hover:opacity-60"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-1 text-[10px]">{cartCount}</span>
              )}
            </button>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div
        className={`fixed inset-0 z-[60] bg-background transition-opacity duration-500 lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="gallery-container flex h-[68px] items-center justify-between">
          <span className="label-xs tracking-[0.3em]">LHR ART GALLERIES</span>
          <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <X className="h-5 w-5" strokeWidth={1} />
          </button>
        </div>
        <nav className="gallery-container mt-10 flex flex-col gap-6" aria-label="Mobile">
          {MOBILE_NAV.map((item, i) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="font-[family-name:var(--font-display)] text-4xl font-light transition-all duration-700"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "none" : "translateY(20px)",
                transitionDelay: `${120 + i * 55}ms`,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
