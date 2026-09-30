import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — LHR Art Galleries" },
      {
        name: "description",
        content:
          "Visit, call or write to LHR Art Galleries in Lahore. Advice on choosing art for your space, viewings by appointment.",
      },
      { property: "og:title", content: "Contact | LHR Art Galleries" },
      {
        property: "og:description",
        content: "Write, call or visit the gallery in Lahore. Viewings by appointment.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="pt-[68px] md:pt-20">
      <header className="gallery-container py-20 md:py-28">
        <p className="label-xs text-muted-foreground">Contact</p>
        <h1 className="display-lg mt-6 max-w-2xl">We are easy to reach, and happy to talk.</h1>
      </header>

      <div className="gallery-container grid gap-16 pb-24 lg:grid-cols-[1fr_1.2fr] md:pb-32">
        <Reveal className="space-y-10">
          <div>
            <p className="label-xs text-muted-foreground">Gallery</p>
            <p className="mt-4 text-sm leading-relaxed">
              12-C, Main Boulevard, Gulberg III
              <br />
              Lahore, Pakistan
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Viewings by appointment</p>
          </div>
          <div>
            <p className="label-xs text-muted-foreground">Write or call</p>
            <p className="mt-4 text-sm leading-relaxed">
              hello@lhrartgalleries.pk
              <br />
              +92 42 3575 0100
            </p>
          </div>
          <div>
            <p className="label-xs text-muted-foreground">Hours</p>
            <p className="mt-4 text-sm leading-relaxed">
              Monday – Saturday, 11:00 – 19:00
              <br />
              Sunday by appointment
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          {sent ? (
            <div className="border border-border p-10">
              <h2 className="font-[family-name:var(--font-display)] text-3xl">Thank you.</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Your message has been received. We reply within one working day.
              </p>
            </div>
          ) : (
            <form
              className="space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="grid gap-8 sm:grid-cols-2">
                <label className="block">
                  <span className="label-xs text-muted-foreground">Name</span>
                  <input
                    required
                    type="text"
                    className="mt-3 w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground"
                  />
                </label>
                <label className="block">
                  <span className="label-xs text-muted-foreground">Email</span>
                  <input
                    required
                    type="email"
                    className="mt-3 w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground"
                  />
                </label>
              </div>
              <label className="block">
                <span className="label-xs text-muted-foreground">How can we help?</span>
                <textarea
                  required
                  rows={5}
                  className="mt-3 w-full resize-none border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground"
                />
              </label>
              <button
                type="submit"
                className="label-xs bg-ink px-8 py-4 text-ink-foreground transition-opacity hover:opacity-85"
              >
                Send message
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </div>
  );
}
