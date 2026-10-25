import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
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

type Method = "card" | "bank";

const field =
  "mt-3 w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground";

export function luhnValid(num: string) {
  const d = num.replace(/\D/g, "");
  if (d.length < 13 || d.length > 19) return false;
  let sum = 0;
  for (let i = 0; i < d.length; i++) {
    let n = Number(d[d.length - 1 - i]);
    if (i % 2 === 1) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
  }
  return sum % 10 === 0;
}

function PaymentFields({ method, setMethod }: { method: Method; setMethod: (m: Method) => void }) {
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  return (
    <fieldset className="space-y-8">
      <legend className="label-xs text-muted-foreground">Payment</legend>
      <div className="flex gap-8">
        {(["card", "bank"] as const).map((m) => (
          <label key={m} className="flex cursor-pointer items-center gap-3 text-sm">
            <input
              type="radio"
              name="method"
              checked={method === m}
              onChange={() => setMethod(m)}
              className="accent-foreground"
            />
            {m === "card" ? "Credit / debit card" : "Bank transfer"}
          </label>
        ))}
      </div>

      {method === "card" ? (
        <div className="space-y-8">
          <label className="block">
            <span className="label-xs text-muted-foreground">Name on card</span>
            <input required name="cardName" autoComplete="cc-name" className={field} />
          </label>
          <label className="block">
            <span className="label-xs text-muted-foreground">Card number</span>
            <input
              required
              name="cardNumber"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 5678 9012 3456"
              value={card}
              onChange={(e) =>
                setCard(
                  e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 19)
                    .replace(/(.{4})/g, "$1 ")
                    .trim(),
                )
              }
              className={field}
            />
          </label>
          <div className="grid gap-8 sm:grid-cols-2">
            <label className="block">
              <span className="label-xs text-muted-foreground">Expiry (MM/YY)</span>
              <input
                required
                name="cardExp"
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM/YY"
                value={exp}
                onChange={(e) => {
                  const d = e.target.value.replace(/\D/g, "").slice(0, 4);
                  setExp(d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d);
                }}
                className={field}
              />
            </label>
            <label className="block">
              <span className="label-xs text-muted-foreground">CVC</span>
              <input
                required
                name="cardCvc"
                inputMode="numeric"
                autoComplete="cc-csc"
                pattern="\d{3,4}"
                maxLength={4}
                className={field}
              />
            </label>
          </div>
          <p className="text-xs text-muted-foreground">
            Visa, Mastercard and UnionPay accepted. Card details are never stored by the gallery.
          </p>
        </div>
      ) : (
        <div className="max-w-md space-y-2 border border-border p-6 text-sm leading-relaxed">
          <p className="label-xs text-muted-foreground">Transfer to</p>
          <p>LHR Art Galleries</p>
          <p className="text-muted-foreground">Bank: Meezan Bank, Gulberg Branch</p>
          <p className="text-muted-foreground">IBAN: PK00 MEZN 0000 0000 0000 0000</p>
          <p className="pt-2 text-xs text-muted-foreground">
            Use your phone number as the reference. The work is dispatched once payment clears.
          </p>
        </div>
      )}
    </fieldset>
  );
}

function Checkout() {
  const { cartItems, subtotal, clearCart } = useGallery();
  const [method, setMethod] = useState<Method>("card");
  const [error, setError] = useState("");

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
            if (method === "card") {
              const fd = new FormData(e.currentTarget);
              const num = String(fd.get("cardNumber") ?? "");
              const exp = String(fd.get("cardExp") ?? "");
              const [mm, yy] = exp.split("/").map(Number);
              const now = new Date();
              const expired =
                !mm || !yy || mm < 1 || mm > 12 ||
                2000 + yy < now.getFullYear() ||
                (2000 + yy === now.getFullYear() && mm < now.getMonth() + 1);
              if (!luhnValid(num)) return setError("Please check your card number.");
              if (expired) return setError("Please check the card's expiry date.");
            }
            setError("");
            clearCart();
            window.alert(
              method === "card"
                ? "Thank you. Your payment was received and your order is confirmed."
                : "Thank you. Your order is reserved — please complete the bank transfer.",
            );
          }}
        >
          {error && <p role="alert" className="text-sm text-accent">{error}</p>}
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

          <PaymentFields method={method} setMethod={setMethod} />

          <button
            type="submit"
            className="label-xs w-full bg-ink px-8 py-4 text-ink-foreground transition-opacity hover:opacity-85 sm:w-auto"
          >
            {method === "card" ? `Pay ${formatPKR(subtotal + SHIPPING)}` : "Place order"}
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
