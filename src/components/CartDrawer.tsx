import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { formatPKR } from "@/data/artworks";
import { useGallery } from "@/lib/store";

export const SHIPPING_FLAT = 4500;

export function CartDrawer() {
  const { cartOpen, setCartOpen, cartItems, subtotal, setQty, removeFromCart } = useGallery();

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  const shipping = cartItems.length ? SHIPPING_FLAT : 0;

  return (
    <>
      <div
        onClick={() => setCartOpen(false)}
        className={`fixed inset-0 z-[80] bg-ink/40 transition-opacity duration-500 ${
          cartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!cartOpen}
        className={`fixed right-0 top-0 z-[90] flex h-dvh w-full max-w-md flex-col bg-background transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-6">
          <span className="label-xs">Your Cart ({cartItems.length})</span>
          <button type="button" aria-label="Close cart" onClick={() => setCartOpen(false)}>
            <X className="h-5 w-5" strokeWidth={1} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {cartItems.length === 0 ? (
            <p className="py-16 text-sm text-muted-foreground">
              Your cart is empty. Every painting here is a one-of-a-kind original.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {cartItems.map(({ artwork, qty }) => (
                <li key={artwork.slug} className="flex gap-5 py-6">
                  <Link
                    to="/artwork/$slug"
                    params={{ slug: artwork.slug }}
                    onClick={() => setCartOpen(false)}
                    className="art-frame h-28 w-24 shrink-0"
                  >
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  <div className="flex-1">
                    <p className="text-lg leading-tight">{artwork.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{artwork.artist}</p>
                    <p className="mt-2 text-sm">{formatPKR(artwork.price)}</p>
                    <div className="mt-3 flex items-center gap-4">
                      <div className="flex items-center gap-3 border border-border px-3 py-1">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => setQty(artwork.slug, qty - 1)}
                        >
                          <Minus className="h-3 w-3" strokeWidth={1.5} />
                        </button>
                        <span className="text-xs">{qty}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => setQty(artwork.slug, qty + 1)}
                        >
                          <Plus className="h-3 w-3" strokeWidth={1.5} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(artwork.slug)}
                        className="label-xs text-muted-foreground link-underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-border px-6 py-6">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatPKR(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping &amp; handling</dt>
              <dd>{shipping ? formatPKR(shipping) : "—"}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base">
              <dt>Total</dt>
              <dd>{formatPKR(subtotal + shipping)}</dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              to="/checkout"
              onClick={() => setCartOpen(false)}
              className="label-xs bg-ink px-6 py-4 text-center text-ink-foreground transition-opacity hover:opacity-85 aria-disabled:opacity-40"
              aria-disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(false)}
              className="label-xs border border-border px-6 py-4 transition-colors hover:bg-cream"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
