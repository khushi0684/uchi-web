import { Link, createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/uchi/Nav";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Uchi" },
      { name: "description", content: "Uchi terms and conditions." },
      { property: "og:title", content: "Terms & Conditions — Uchi" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      <section className="pt-32 pb-20 bg-cream">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 text-center">
          <p className="text-[10px] tracking-[0.35em] uppercase text-clay">Policies</p>
          <h1 className="mt-4 font-serif text-5xl lg:text-7xl text-balance">Terms & Conditions.</h1>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 space-y-12">
          <div>
            <h2 className="font-serif text-2xl">1. Acceptance of Terms</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              By accessing or using the Uchi website, you agree to be bound by these Terms & Conditions.
              If you do not agree, please do not use our site.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl">2. Orders & Payment</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              All orders are subject to availability and confirmation of the order price. Payment must be made
              in full before dispatch. We reserve the right to refuse any order.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl">3. Shipping & Delivery</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Delivery times are estimates and commence from the date of dispatch. We are not responsible for
              delays caused by customs, weather, or courier issues.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl">4. Returns & Refunds</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Returns are accepted within 14 days of delivery for unused items in original packaging. Refunds
              are processed within 5–7 business days of receiving the returned item.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl">5. Intellectual Property</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              All content on this website, including images, text, and designs, is the property of Uchi
              and may not be used without our written permission.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl">6. Governing Law</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              These terms are governed by the laws of India. Any disputes shall be resolved in the courts of Bangalore.
            </p>
          </div>
        </div>
      </section>

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
    </div>
  );
}
