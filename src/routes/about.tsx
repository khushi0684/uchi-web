import { Link, createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/uchi/Nav";
import { Leaf, Package, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-ceramics.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Uchi" },
      { name: "description", content: "Learn about Uchi's philosophy of timeless design and thoughtful craftsmanship." },
      { property: "og:title", content: "About — Uchi" },
      { property: "og:description", content: "Crafted with purpose. Made for life." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      <section className="relative pt-32 pb-20 bg-cream">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="text-[10px] tracking-[0.35em] uppercase text-clay">About Uchi</p>
          <h1 className="mt-4 font-serif text-5xl lg:text-7xl text-balance leading-tight">
            Crafted with Purpose.<br />
            <span className="italic font-light">Made for Life.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Uchi is a small homegrown studio celebrating the calm of Japanese minimalism and the honesty of timeless craftsmanship.
            Each piece is thoughtfully drawn, slowly made, and finished by hand — designed to bring quiet beauty and purpose into modern living.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { Icon: Leaf, t: "Timeless Design", d: "Forms that quietly outlast trend cycles. We design for permanence, not seasons." },
              { Icon: Package, t: "Functional Everyday", d: "Built for daily rituals, not display. Every curve serves a purpose." },
              { Icon: Sparkles, t: "Made with Care", d: "Finished by a small studio of nine. Hands touch every piece before it reaches yours." },
            ].map(({ Icon, t, d }) => (
              <div key={t}>
                <div className="w-14 h-14 rounded-full border border-clay/30 bg-cream grid place-items-center text-clay">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl mt-6">{t}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-cream">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-clay">Our Story</p>
            <h2 className="mt-4 font-serif text-4xl lg:text-5xl leading-tight">From a small studio to homes worldwide.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              What began as a ceramics practice in a garage studio has grown into a community of makers,
              designers, and quiet-living enthusiasts across 80,000 homes. We still finish every piece by hand.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                ["12+", "Years of craft"],
                ["80K", "Homes worldwide"],
                ["100%", "Hand finished"],
              ].map(([k, v]) => (
                <div key={v}>
                  <p className="font-serif text-3xl">{k}</p>
                  <p className="text-[11px] uppercase tracking-[0.2em] mt-1 text-muted-foreground">{v}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-sand">
            <img
              src={heroImg}
              alt="Uchi studio workspace with ceramics"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-cream border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-12 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Uchi. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-clay transition">Privacy</Link>
          <Link to="/terms" className="hover:text-clay transition">Terms</Link>
          <Link to="/cookies" className="hover:text-clay transition">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
