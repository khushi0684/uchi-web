import { Link, createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/uchi/Nav";
import { Leaf, Recycle, TreePine, Droplets } from "lucide-react";

export const Route = createFileRoute("/sustainability")({
  head: () => ({
    meta: [
      { title: "Sustainability — Uchi Studio" },
      { name: "description", content: "Uchi Studio's commitment to sustainable practices and ethical craftsmanship." },
      { property: "og:title", content: "Sustainability — Uchi Studio" },
      { property: "og:description", content: "Designed for a sustainable tomorrow." },
    ],
  }),
  component: SustainabilityPage,
});

function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav cartCount={0} wishCount={0} onCartClick={() => {}} onWishClick={() => {}} onSearchClick={() => {}} onAccountClick={() => {}} />

      <section className="pt-32 pb-20 bg-cream">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 text-center">
          <p className="text-[10px] tracking-[0.35em] uppercase text-clay">Our Commitment</p>
          <h1 className="mt-4 font-serif text-5xl lg:text-7xl text-balance">Designed for a Sustainable Tomorrow.</h1>
          <p className="mt-6 max-w-xl mx-auto text-muted-foreground leading-relaxed">
            We believe beautiful design should not come at the cost of the planet.
            Every decision we make considers its impact on people and the environment.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              { Icon: Leaf, t: "Natural Materials", d: "We source clay, wood, and fibres from responsible suppliers who share our values." },
              { Icon: Recycle, t: "Closed-Loop Kilns", d: "Our goal is to capture and reuse kiln heat by 2030, reducing energy waste." },
              { Icon: TreePine, t: "Repair for Life", d: "Every piece is designed to be repaired, not replaced. We offer lifetime repair services." },
              { Icon: Droplets, t: "Water Conscious", d: "We recycle glazing water and use rainwater harvesting at our studio." },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="bg-cream rounded-3xl p-8 border border-border/60">
                <div className="w-12 h-12 rounded-full bg-clay/15 text-clay grid place-items-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl mt-5">{t}</h3>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto space-y-12">
            <div>
              <h2 className="font-serif text-3xl">Our Materials</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                We work directly with clay miners, wood suppliers, and textile makers who share our commitment to ethical practices.
                Our stoneware clay comes from family-run mines in Gujarat. Our oak and walnut are FSC-certified.
                Our bouclé textiles are woven by a cooperative of women artisans in Karnataka.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-3xl">Packaging</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Every order is wrapped in linen and protected with recyclable cardboard and paper fill.
                We do not use plastic bubble wrap or foam. Our shipping boxes are made from 100% recycled paper
                and are themselves fully recyclable.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-3xl">Our 2030 Goals</h2>
              <ul className="mt-4 space-y-3 text-muted-foreground leading-relaxed">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-clay shrink-0 mt-2" />
                  Achieve closed-loop energy use across all kilns.
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-clay shrink-0 mt-2" />
                  Source 100% of materials from certified ethical suppliers.
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-clay shrink-0 mt-2" />
                  Offer repair services for every piece we have ever sold.
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-clay shrink-0 mt-2" />
                  Achieve zero waste to landfill at our Bangalore studio.
                </li>
              </ul>
            </div>
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
