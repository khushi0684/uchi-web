import { Link, createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/uchi/Nav";
import { RefreshCcw, ShieldCheck, CalendarDays } from "lucide-react";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Returns & Exchanges — Uchi Studio" },
      { name: "description", content: "Returns, exchanges, and refund policy for Uchi Studio." },
      { property: "og:title", content: "Returns & Exchanges — Uchi Studio" },
      { property: "og:description", content: "Hassle-free returns within 14 days." },
    ],
  }),
  component: ReturnsPage,
});

function ReturnsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav cartCount={0} wishCount={0} onCartClick={() => {}} onWishClick={() => {}} onSearchClick={() => {}} onAccountClick={() => {}} />

      <section className="pt-32 pb-20 bg-cream">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 text-center">
          <p className="text-[10px] tracking-[0.35em] uppercase text-clay">Customer Care</p>
          <h1 className="mt-4 font-serif text-5xl lg:text-7xl text-balance">Returns & Exchanges.</h1>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              { Icon: CalendarDays, t: "14-Day Returns", d: "Return unused items in original packaging within 14 days of delivery." },
              { Icon: RefreshCcw, t: "Easy Exchanges", d: "Exchange for a different size, colour, or piece at no extra cost." },
              { Icon: ShieldCheck, t: "Damage Protection", d: "Ceramic damage claims must be reported within 48 hours of delivery." },
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
              <h2 className="font-serif text-3xl">How to Return</h2>
              <ol className="mt-6 space-y-4 list-decimal list-inside text-muted-foreground leading-relaxed">
                <li>Email us at hello@uchi.studio with your order number and reason for return.</li>
                <li>We will send you a prepaid return label for domestic orders.</li>
                <li>Pack the item securely in its original packaging.</li>
                <li>Drop off at the nearest courier location or schedule a pickup.</li>
                <li>Refunds are processed within 5–7 business days of receiving the return.</li>
              </ol>
            </div>
            <div>
              <h2 className="font-serif text-3xl">Non-Returnable Items</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Custom-made and personalised pieces cannot be returned unless damaged or defective.
                Sale items are final sale and not eligible for return unless faulty.
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
