import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { artworks, type Artwork } from "@/data/artworks";

type CartLine = { slug: string; qty: number };

type GalleryState = {
  cart: CartLine[];
  cartItems: { artwork: Artwork; qty: number }[];
  cartCount: number;
  subtotal: number;
  addToCart: (slug: string) => void;
  removeFromCart: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
};

// Keep one context instance across hot reloads so Provider and consumers always match.
const g = globalThis as unknown as { __lhrGalleryCtx?: React.Context<GalleryState | null> };
const GalleryContext = (g.__lhrGalleryCtx ??= createContext<GalleryState | null>(null));

const CART_KEY = "lhr-cart";
const WISH_KEY = "lhr-wishlist";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function GalleryProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(read<CartLine[]>(CART_KEY, []));
    setWishlist(read<string[]>(WISH_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const addToCart = useCallback((slug: string) => {
    setCart((prev) =>
      prev.some((l) => l.slug === slug)
        ? prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + 1 } : l))
        : [...prev, { slug, qty: 1 }],
    );
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    setCart((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, qty } : l)),
    );
  }, []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }, []);

  const value = useMemo<GalleryState>(() => {
    const cartItems = cart
      .map((line) => {
        const artwork = artworks.find((a) => a.slug === line.slug);
        return artwork ? { artwork, qty: line.qty } : null;
      })
      .filter((x): x is { artwork: Artwork; qty: number } => x !== null);

    return {
      cart,
      cartItems,
      cartCount: cartItems.reduce((n, i) => n + i.qty, 0),
      subtotal: cartItems.reduce((n, i) => n + i.artwork.price * i.qty, 0),
      addToCart,
      removeFromCart,
      setQty,
      clearCart: () => setCart([]),
      cartOpen,
      setCartOpen,
      wishlist,
      toggleWishlist,
      isWishlisted: (slug: string) => wishlist.includes(slug),
    };
  }, [cart, cartOpen, wishlist, addToCart, removeFromCart, setQty, toggleWishlist]);

  return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
}

export function useGallery() {
  const ctx = useContext(GalleryContext);
  if (!ctx) throw new Error("useGallery must be used inside GalleryProvider");
  return ctx;
}
