import { Link, createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/uchi/Nav";
import { Droplets, Sun, Wind, Box } from "lucide-react";

export const Route = createFileRoute("/care-guide")({
  head: () => ({
    meta: [
      { title: "Care Guide — Uchi Studio" },
      { name: "description", content: "How to care for your Uchi ceramics and furniture." },
      { property: "og:title", content: "Care Guide — Uchi Studio" },
      { property: "og:description", content: "Keep your pieces beautiful for years to come." },
    ],
  }),
  component: CareGuidePage,
});

function CareGuidePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav cartCount={0} wishCount={0} onCartClick={() => {}} onWishClick={() => {}} onSearchClick={() => {}} onAccountClick={() => {}} />

      <section className="pt-32 pb-20 bg-cream">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 text-center">
          <p className="text-[10px] tracking-[0.35em] uppercase text-clay">Customer Care</p>
          <h1 className="mt-4 font-serif text-5xl lg:text-7xl text-balance">Care Guide.</h1>
          <p className="mt-6 max-w-xl mx-auto text-muted-foreground leading-relaxed">
            A little care goes a long way. Here is how to keep your Uchi pieces beautiful for years to come.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                Icon: Droplets,
                t: "Ceramics",
                tips: [
                  "Hand wash for best results, especially pieces with delicate glazes.",
                  "Most stoneware is dishwasher-safe on a gentle cycle.",
                  "Avoid sudden temperature changes — do not move from freezer to oven.",
                  "Microwave-safe unless noted otherwise on the product page.",
                ],
              },
              {
                Icon: Sun,
                t: "Wood Furniture",
                tips: [
                  "Wipe with a soft, damp cloth and dry immediately.",
                  "Apply natural beeswax polish every 6 months.",
                  "Keep away from direct sunlight to prevent fading and warping.",
                  "Use coasters and placemats to protect surfaces.",
                ],
              },
              {
                Icon: Wind,
                t: "Textiles",
                tips: [
                  "Vacuum upholstery regularly using a soft brush attachment.",
                  "Spot clean with mild soap and water — do not saturate.",
                  "Professional dry cleaning recommended for deep cleans.",
                  "Rotate cushions monthly for even wear.",
                ],
              },
              {
                Icon: Box,
                t: "Lighting",
                tips: [
                  "Dust shades gently with a soft, dry cloth.",
                  "For paper shades, use a feather duster or hair dryer on cool.",
                  "Unplug before cleaning or changing bulbs.",
                  "Use LED bulbs to reduce heat and extend shade life.",
                ],
              },
            ].map(({ Icon, t, tips }) => (
              <div key={t} className="bg-cream rounded-3xl p-8 border border-border/60">
                <div className="w-12 h-12 rounded-full bg-clay/15 text-clay grid place-items-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-2xl mt-5">{t}</h3>
                <ul className="mt-4 space-y-3 text-muted-foreground text-sm leading-relaxed">
                  {tips.map((tip, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-clay shrink-0 mt-2" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
