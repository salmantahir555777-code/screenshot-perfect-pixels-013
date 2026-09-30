import { createFileRoute, Link } from "@tanstack/react-router";
import { useGallery } from "@/lib/store";
import { formatPKR } from "@/data/artworks";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — LHR Art Galleries" },
      { name: "description", content: "Complete your order with LHR Art Galleries." },
      { property: "og:title", content: "Checkout | LHR Art Galleries" },
      { property: "og:description", content: "Complete your order with the gallery." },
    ],
  }),
  component: Checkout,
});

const SHIPPING = 4500;

function Checkout() {
  const { cartItems, subtotal, clearCart } = useGallery();

  if (cartItems.length === 0) {
    return (
      <div className="pt-[68px] md:pt-20">
        <header className="gallery-container py-20 md:py-28">
          <p className="label-xs text-muted-foreground">Checkout</p>
          <h1 className="display-lg mt-6">Your cart is empty.</h1>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
            Every painting is sold once — find the one for your wall.{" "}
            <Link to="/gallery" className="link-underline text-foreground">
              Browse the gallery
            </Link>
            .
          </p>
        </header>
      </div>
    );
  }

  return (
    <div className="pt-[68px] md:pt-20">
      <header className="gallery-container py-16 md:py-24">
        <p className="label-xs text-muted-foreground">Checkout</p>
        <h1 className="display-lg mt-6">Complete your order.</h1>
      </header>

      <div className="gallery-container grid gap-16 pb-24 lg:grid-cols-[1.2fr_0.8fr] md:pb-32">
        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            clearCart();
            window.alert(
              "Thank you. Your order is confirmed — a confirmation email is on its way from the gallery.",
            );
          }}
        >
          <fieldset className="space-y-8">
            <legend className="label-xs text-muted-foreground">Delivery details</legend>
            <div className="grid gap-8 sm:grid-cols-2">
              <label className="block">
                <span className="label-xs text-muted-foreground">Full name</span>
                <input
                  required
                  type="text"
                  className="mt-3 w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground"
                />
              </label>
              <label className="block">
                <span className="label-xs text-muted-foreground">Phone</span>
                <input
                  required
                  type="tel"
                  className="mt-3 w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground"
                />
              </label>
            </div>
            <label className="block">
              <span className="label-xs text-muted-foreground">Email</span>
              <input
                required
                type="email"
                className="mt-3 w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground"
              />
            </label>
            <label className="block">
              <span className="label-xs text-muted-foreground">Address</span>
              <input
                required
                type="text"
                className="mt-3 w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground"
              />
            </label>
            <div className="grid gap-8 sm:grid-cols-2">
              <label className="block">
                <span className="label-xs text-muted-foreground">City</span>
                <input
                  required
                  type="text"
                  className="mt-3 w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground"
                />
              </label>
              <label className="block">
                <span className="label-xs text-muted-foreground">Country</span>
                <select
                  defaultValue="Pakistan"
                  className="mt-3 w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground"
                >
                  <option>Pakistan</option>
                  <option>United Arab Emirates</option>
                  <option>United Kingdom</option>
                  <option>United States</option>
                </select>
              </label>
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="label-xs text-muted-foreground">Payment on confirmation</legend>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              The gallery confirms payment by email — bank transfer or card — before the work is
              crated and dispatched.
            </p>
          </fieldset>

          <button
            type="submit"
            className="label-xs w-full bg-ink px-8 py-4 text-ink-foreground transition-opacity hover:opacity-85 sm:w-auto"
          >
            Place order
          </button>
        </form>

        <aside className="h-fit border border-border p-8 lg:sticky lg:top-28">
          <p className="label-xs text-muted-foreground">Your order</p>
          <ul className="mt-6 space-y-5">
            {cartItems.map(({ artwork, qty }) => (
              <li key={artwork.slug} className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-sm">{artwork.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {artwork.artist} · Qty {qty}
                  </p>
                </div>
                <p className="text-sm whitespace-nowrap">{formatPKR(artwork.price * qty)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 space-y-3 border-t border-border pt-6 text-sm">
            <p className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatPKR(subtotal)}</span>
            </p>
            <p className="flex justify-between text-muted-foreground">
              <span>Crated delivery</span>
              <span>{formatPKR(SHIPPING)}</span>
            </p>
            <p className="flex justify-between pt-2 text-base">
              <span>Total</span>
              <span>{formatPKR(subtotal + SHIPPING)}</span>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
