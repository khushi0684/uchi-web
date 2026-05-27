import { Link, createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/uchi/Nav";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — Uchi" },
      { name: "description", content: "Frequently asked questions about orders, shipping, returns, and care." },
      { property: "og:title", content: "FAQs — Uchi" },
      { property: "og:description", content: "Find answers to common questions." },
    ],
  }),
  component: FAQsPage,
});

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Most orders ship within 2–3 business days. Delivery within India typically takes 5–7 business days. International orders may take 10–15 business days.",
  },
  {
    q: "Do you offer cash on delivery?",
    a: "Yes, we offer COD for orders within India up to ₹25,000. For larger orders, we require online payment for security.",
  },
  {
    q: "What is your return policy?",
    a: "We accept returns within 14 days of delivery for unused items in original packaging. Ceramic pieces must be inspected within 48 hours of delivery for damage claims.",
  },
  {
    q: "Are your ceramics dishwasher safe?",
    a: "Most of our stoneware is dishwasher safe, but we recommend hand washing for pieces with delicate glazes or gold accents to preserve their finish.",
  },
  {
    q: "Do you offer custom orders?",
    a: "Yes, we accept custom commissions for furniture and select ceramic pieces. Lead times vary from 6–12 weeks depending on the project.",
  },
  {
    q: "How do I care for my wooden furniture?",
    a: "Wipe with a soft, damp cloth. Avoid direct sunlight and extreme humidity. We recommend applying a natural beeswax polish every 6 months.",
  },
];

function FAQsPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      <section className="pt-32 pb-20 bg-cream">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 text-center">
          <p className="text-[10px] tracking-[0.35em] uppercase text-clay">Customer Care</p>
          <h1 className="mt-4 font-serif text-5xl lg:text-7xl text-balance">Frequently Asked Questions.</h1>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`border rounded-2xl transition-colors ${open === i ? "border-clay/40 bg-cream" : "border-border bg-ivory"}`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-serif text-lg pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && (
                  <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
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
