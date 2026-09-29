import { useState } from "react";
import { Reveal } from "./Reveal";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="border-t border-border py-24 md:py-36">
      <div className="gallery-container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="label-xs text-muted-foreground">Newsletter</p>
          <h2 className="display-md mt-6">Enter the world of art.</h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Be the first to discover new paintings, artist stories, exhibitions, and curated
            collections.
          </p>
          {done ? (
            <p className="mt-10 label-xs text-accent">Thank you — you are on the list.</p>
          ) : (
            <form
              className="mx-auto mt-10 flex max-w-md items-end gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setDone(true);
              }}
            >
              <div className="flex-1 text-left">
                <label htmlFor="newsletter-email" className="label-xs text-muted-foreground">
                  Your email
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full border-b border-border bg-transparent pb-2 text-sm outline-none transition-colors focus:border-accent"
                  placeholder="name@example.com"
                />
              </div>
              <button type="submit" className="label-xs link-underline pb-2">
                Subscribe
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
