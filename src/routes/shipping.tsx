import { Link, createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/uchi/Nav";
import { Truck, Clock, Package, Globe } from "lucide-react";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping & Delivery — Uchi Studio" },
      { name: "description", content: "Shipping and delivery information for Uchi Studio orders." },
      { property: "og:title", content: "Shipping & Delivery — Uchi Studio" },
      { property: "og:description", content: "How we get your pieces to you safely." },
    ],
  }),
  component: ShippingPage,
});

function ShippingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav cartCount={0} wishCount={0} onCartClick={() => {}} onWishClick={() => {}} onSearchClick={() => {}} onAccountClick={() => {}} />

      <section className="pt-32 pb-20 bg-cream">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 text-center">
          <p className="text-[10px] tracking-[0.35em] uppercase text-clay">Customer Care</p>
          <h1 className="mt-4 font-serif text-5xl lg:text-7xl text-balance">Shipping & Delivery.</h1>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              { Icon: Truck, t: "Free Shipping", d: "Complimentary shipping on all orders within India. No minimum required." },
              { Icon: Clock, t: "Fast Dispatch", d: "Orders ship within 2–3 business days from our Bangalore studio." },
              { Icon: Package, t: "Secure Packaging", d: "Every piece is wrapped in linen and protected with recyclable materials." },
              { Icon: Globe, t: "Worldwide", d: "We ship to 40+ countries. International rates calculated at checkout." },
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
              <h2 className="font-serif text-3xl">Domestic Shipping</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                All orders within India ship free via our trusted courier partners. Delivery typically takes 5–7 business days
                depending on your location. You will receive a tracking number via email once your order is dispatched.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-3xl">International Shipping</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                We ship to over 40 countries worldwide. International shipping rates are calculated at checkout based on
                destination and package weight. Delivery times range from 10–15 business days. Please note that customs duties
                and import taxes may apply and are the responsibility of the recipient.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-3xl">Large Furniture</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Furniture items such as tables, cabinets, and sofas are delivered via white-glove service within India.
                Our team will contact you to schedule a delivery appointment. Assembly is included where applicable.
              </p>
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
