import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account — LHR Art Galleries" },
      {
        name: "description",
        content: "Your saved artworks and orders at LHR Art Galleries.",
      },
      { property: "og:title", content: "Account | LHR Art Galleries" },
      { property: "og:description", content: "Your saved artworks and orders." },
    ],
  }),
  component: Account,
});

function Account() {
  return (
    <div className="pt-[68px] md:pt-20">
      <header className="gallery-container py-20 md:py-28">
        <p className="label-xs text-muted-foreground">Account</p>
        <h1 className="display-lg mt-6">Good things take time.</h1>
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Collector accounts are being prepared. In the meantime, your saved artworks stay on
          this device, and every order is confirmed by email from the gallery.
        </p>
      </header>

      <section className="gallery-container grid gap-10 pb-24 sm:grid-cols-2 md:pb-32">
        <div className="border border-border p-10">
          <p className="label-xs text-muted-foreground">Saved artworks</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            The paintings you have hearted are kept for you.
          </p>
          <Link to="/wishlist" className="mt-8 inline-flex label-xs link-underline">
            View saved artworks
          </Link>
        </div>
        <div className="border border-border p-10">
          <p className="label-xs text-muted-foreground">Orders & enquiries</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Order confirmations and commission updates are sent to your email. Write to us any
            time at hello@lhrartgalleries.pk.
          </p>
          <Link to="/contact" className="mt-8 inline-flex label-xs link-underline">
            Contact the gallery
          </Link>
        </div>
      </section>
    </div>
  );
}
