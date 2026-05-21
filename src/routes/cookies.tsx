import { Link, createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/uchi/Nav";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookies — Uchi Studio" },
      { name: "description", content: "Uchi Studio cookies policy." },
      { property: "og:title", content: "Cookies — Uchi Studio" },
    ],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      <section className="pt-32 pb-20 bg-cream">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 text-center">
          <p className="text-[10px] tracking-[0.35em] uppercase text-clay">Policies</p>
          <h1 className="mt-4 font-serif text-5xl lg:text-7xl text-balance">Cookies.</h1>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 space-y-12">
          <div>
            <h2 className="font-serif text-2xl">What Are Cookies</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Cookies are small text files that are stored on your device when you visit a website.
              They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl">How We Use Cookies</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We use cookies to keep track of your shopping cart, remember your preferences, analyse site traffic,
              and understand how visitors interact with our website. This helps us improve our products and services.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl">Types of Cookies We Use</h2>
            <ul className="mt-4 space-y-3 text-muted-foreground leading-relaxed">
              <li><strong className="text-foreground">Essential cookies:</strong> Required for the website to function properly, such as maintaining your shopping cart.</li>
              <li><strong className="text-foreground">Analytics cookies:</strong> Help us understand how visitors interact with our website.</li>
              <li><strong className="text-foreground">Preference cookies:</strong> Remember your settings and choices to enhance your experience.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-2xl">Managing Cookies</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              You can manage or delete cookies through your browser settings. Please note that disabling certain cookies
              may affect the functionality of our website.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-cream border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-12 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Uchi Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-clay transition">Privacy</Link>
            <Link to="/terms" className="hover:text-clay transition">Terms</Link>
            <Link to="/cookies" className="hover:text-clay transition">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
