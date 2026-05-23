import { Link, createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/uchi/Nav";
import {
  ArrowRight,
  Clock,
  Instagram,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import heroCeramics from "@/assets/hero-ceramics.jpg";
import collectionNordic from "@/assets/collection-nordic.jpg";
import collectionEarth from "@/assets/collection-earth.jpg";
import productBowl from "@/assets/product-bowl.jpg";
import productVase from "@/assets/product-vase.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Uchi Studio" },
      { name: "description", content: "Get in touch with Uchi Studio for inquiries, support, and collaborations." },
      { property: "og:title", content: "Contact — Uchi Studio" },
      { property: "og:description", content: "We would love to hear from you." },
    ],
  }),
  component: ContactPage,
});

const reasons = [
  "Product inquiry",
  "Order support",
  "Custom commission",
  "Press & media",
  "Collaboration",
  "Just saying hello",
];

const faqs = [
  { q: "How long does delivery take?", a: "Standard delivery is 5–8 business days across India. Express shipping is available at checkout for delivery within 2–3 days." },
  { q: "Do you take custom orders?", a: "Yes — we accept a limited number of custom commissions each quarter. Email us with your brief and we'll schedule a consultation call." },
  { q: "Can I visit the studio?", a: "Studio visits are by appointment only. We host open days twice a year — subscribe to our journal to hear first." },
  { q: "What is your return policy?", a: "We accept returns within 14 days of delivery for unused items in original packaging. Custom orders are non-refundable." },
];

function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function ContactPage() {
  const formRef = useRef<HTMLDivElement>(null);
  useScrollReveal();

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <ContactHero onContact={scrollToForm} />
      <TrustBar />
      <ContactMain formRef={formRef} />
      <StudioImages />
      <FaqStrip />
      <StudioSection onBook={scrollToForm} />
      <ContactFooter />
    </div>
  );
}

/* ── HERO ── */
function ContactHero({ onContact }: { onContact: () => void }) {
  return (
    <section className="relative min-h-[70vh] text-ivory flex items-end overflow-hidden">
      <img
        src={heroCeramics}
        alt="Uchi studio ceramics"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bark via-bark/75 to-bark/30" />
      <div className="absolute inset-0 grain opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px] w-full px-6 lg:px-10 pb-20 pt-44">
        <div className="grid lg:grid-cols-2 gap-10 items-end">
          <div>
            <div className="reveal inline-flex items-center gap-2 rounded-full bg-ivory/10 backdrop-blur border border-ivory/20 px-4 py-1.5 text-[10px] tracking-[0.3em] uppercase text-ivory/70 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-clay animate-pulse" />
              Let's Talk
            </div>
            <h1 className="reveal reveal-delay-1 font-serif text-[clamp(3rem,7vw,6rem)] leading-[0.95] text-balance">
              We'd love to
              <span className="block italic font-light text-clay-soft"> hear from you.</span>
            </h1>
          </div>
          <div className="reveal reveal-delay-2 lg:pb-3">
            <p className="text-ivory/70 text-lg leading-relaxed max-w-md">
              Whether you have a question about a piece, need help with an order, or just want to share what you're making — we're here.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={onContact}
                className="magnetic inline-flex items-center gap-3 rounded-full bg-clay text-ivory pl-7 pr-2 py-2 text-sm font-medium"
              >
                Send a Message
                <span className="grid place-items-center w-10 h-10 rounded-full bg-clay-deep">
                  <Send className="w-4 h-4" />
                </span>
              </button>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 rounded-full border border-ivory/30 text-ivory/80 px-6 py-3 text-sm hover:bg-ivory/10 transition"
              >
                <Phone className="w-4 h-4" /> Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── TRUST BAR ── */
function TrustBar() {
  return (
    <div className="border-y border-border bg-cream py-5">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-clay" /> Replies within 24 hours</span>
        <span className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-clay" /> Human support, always</span>
        <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-clay" /> Mon–Fri, 10am–6pm IST</span>
        <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-clay" /> Studio in Bangalore, India</span>
      </div>
    </div>
  );
}

/* ── CONTACT MAIN ── */
function ContactMain({ formRef }: { formRef: React.RefObject<HTMLDivElement> }) {
  const [form, setForm] = useState({ name: "", email: "", reason: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email.includes("@") || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent — we'll be in touch soon.");
      setForm({ name: "", email: "", reason: "", message: "" });
    }, 1200);
  };

  return (
    <section className="py-20 lg:py-32 bg-background" ref={formRef}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid lg:grid-cols-[1fr_400px] gap-16 xl:gap-24">

        {/* FORM */}
        <div data-reveal="">
          <p className="text-[10px] tracking-[0.35em] uppercase text-clay">Send a Message</p>
          <h2 className="mt-3 font-serif text-4xl lg:text-5xl">Start a conversation.</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Fill in the form below — or reach out directly. Either way, a real person reads every message.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <FloatingInput
                label="Your name" type="text" value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                focused={focused === "name"} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} required
              />
              <FloatingInput
                label="Email address" type="email" value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                focused={focused === "email"} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} required
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                What's this about? <span className="text-muted-foreground/40">(optional)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {reasons.map((r) => (
                  <button
                    key={r} type="button"
                    onClick={() => setForm((f) => ({ ...f, reason: f.reason === r ? "" : r }))}
                    className={`px-3.5 py-2 rounded-full text-xs border transition-all duration-200 ${
                      form.reason === r
                        ? "bg-clay text-ivory border-clay"
                        : "border-border text-muted-foreground hover:border-clay hover:text-clay"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                Your message <span className="text-clay">*</span>
              </label>
              <textarea
                required value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                rows={6} placeholder="Tell us what you have in mind..."
                className={`w-full border rounded-2xl px-5 py-4 bg-cream outline-none text-sm resize-none transition-all duration-300 ${
                  focused === "message" ? "border-clay shadow-[0_0_0_3px_oklch(0.62_0.14_45/0.12)]" : "border-border"
                }`}
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit" disabled={loading}
                className="magnetic inline-flex items-center gap-3 rounded-full bg-clay text-ivory pl-7 pr-2 py-2 text-sm font-medium hover:bg-clay-deep transition-colors disabled:opacity-60"
              >
                {loading ? "Sending…" : "Send Message"}
                <span className="grid place-items-center w-10 h-10 rounded-full bg-clay-deep">
                  {loading
                    ? <span className="w-4 h-4 border-2 border-ivory/40 border-t-ivory rounded-full animate-spin" />
                    : <Send className="w-4 h-4" />
                  }
                </span>
              </button>
              <p className="text-xs text-muted-foreground">We reply within 24 hours.</p>
            </div>
          </form>
        </div>

        {/* INFO SIDEBAR */}
        <aside data-reveal="" data-delay="1" className="space-y-4">
          <p className="text-[10px] tracking-[0.35em] uppercase text-clay">Direct Lines</p>
          <h3 className="font-serif text-2xl">Reach us directly.</h3>

          <a href="mailto:hello@uchi.studio" className="block">
            <ContactCard
              icon={<Mail className="w-5 h-5" />} label="Email"
              primary="hello@uchi.studio" secondary="For general inquiries and orders" accent="Replies within 24h"
            />
          </a>
          <a href="tel:+919876543210" className="block">
            <ContactCard
              icon={<Phone className="w-5 h-5" />} label="Phone"
              primary="+91 98765 43210" secondary="Mon–Fri · 10am – 6pm IST" accent="Call or WhatsApp"
            />
          </a>
          <a href="https://instagram.com/uchi.studio" target="_blank" rel="noopener noreferrer" className="block">
            <ContactCard
              icon={<Instagram className="w-5 h-5" />} label="Instagram"
              primary="@uchi.studio" secondary="Behind-the-scenes & new arrivals" accent="DMs open"
            />
          </a>
          <a href="https://maps.google.com/?q=42+Pottery+Lane+Indiranagar+Bangalore" target="_blank" rel="noopener noreferrer" className="block">
            <ContactCard
              icon={<MapPin className="w-5 h-5" />} label="Studio"
              primary="42 Pottery Lane, Bangalore" secondary="560001, Karnataka, India" accent="By appointment"
            />
          </a>

          {/* Hours */}
          <div className="rounded-2xl bg-bark text-ivory p-7 relative overflow-hidden">
            <div className="absolute inset-0 grain opacity-10 pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs tracking-widest uppercase text-ivory/60">Currently Open</span>
              </div>
              <h4 className="font-serif text-2xl">Studio Hours</h4>
              <ul className="mt-5 space-y-3 text-sm text-ivory/70">
                {[
                  ["Monday – Friday", "10:00 am – 6:00 pm"],
                  ["Saturday", "11:00 am – 4:00 pm"],
                  ["Sunday", "Closed"],
                ].map(([day, time]) => (
                  <li key={day} className="flex justify-between items-center border-b border-ivory/10 pb-3 last:border-0 last:pb-0">
                    <span>{day}</span>
                    <span className="text-ivory/50">{time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function FloatingInput({ label, type, value, onChange, focused, onFocus, onBlur, required }: {
  label: string; type: string; value: string; onChange: (v: string) => void;
  focused: boolean; onFocus: () => void; onBlur: () => void; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
        {label} {required && <span className="text-clay">*</span>}
      </label>
      <input
        type={type} required={required} value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus} onBlur={onBlur}
        className={`w-full border rounded-2xl px-5 py-3.5 bg-cream outline-none text-sm transition-all duration-300 ${
          focused ? "border-clay shadow-[0_0_0_3px_oklch(0.62_0.14_45/0.12)]" : "border-border"
        }`}
      />
    </div>
  );
}

function ContactCard({ icon, label, primary, secondary, accent }: {
  icon: React.ReactNode; label: string; primary: string; secondary: string; accent: string;
}) {
  return (
    <div className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-cream p-5 hover:border-clay/40 hover:shadow-soft transition-all duration-300">
      <div className="w-11 h-11 rounded-xl bg-clay/10 text-clay flex items-center justify-center shrink-0 group-hover:bg-clay group-hover:text-ivory transition-all duration-300">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{label}</p>
        <p className="mt-1 font-medium text-sm text-foreground">{primary}</p>
        <p className="text-xs text-muted-foreground">{secondary}</p>
        <span className="mt-2 inline-block text-[10px] tracking-wide bg-clay/10 text-clay rounded-full px-2.5 py-1">{accent}</span>
      </div>
    </div>
  );
}

/* ── STUDIO IMAGES ── */
function StudioImages() {
  return (
    <section className="py-16 bg-cream overflow-hidden">
      <div data-reveal="" className="mx-auto max-w-[1400px] px-6 lg:px-10 mb-8 flex items-center gap-3">
        <span className="text-[10px] tracking-[0.35em] uppercase text-clay">Our Studio</span>
        <span className="flex-1 h-px bg-border" />
      </div>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { src: collectionEarth, alt: "Earth & clay ceramics", label: "The Kiln Room" },
          { src: productBowl, alt: "Handcrafted ceramic bowl", label: "Fresh from the Wheel" },
          { src: productVase, alt: "Ceramic vase", label: "Glazing Studio" },
          { src: collectionNordic, alt: "Nordic warmth collection", label: "Finished Pieces" },
        ].map(({ src, alt, label }, i) => (
          <div
            key={i}
            data-reveal=""
            data-delay={String(i + 1)}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden"
          >
            <img src={src} alt={alt} className="w-full h-full object-cover img-zoom" />
            <div className="absolute inset-0 bg-gradient-to-t from-bark/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="text-xs text-ivory/80 font-light">{label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── FAQ STRIP ── */
function FaqStrip() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-[320px_1fr] gap-16 items-start">
          <div data-reveal="">
            <p className="text-[10px] tracking-[0.35em] uppercase text-clay">Quick Answers</p>
            <h2 className="mt-3 font-serif text-4xl text-balance">Common questions.</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Can't find what you need? Our full FAQ page covers shipping, returns, care, and more.
            </p>
            <Link
              to="/faqs"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-clay hover:gap-4 transition-all"
            >
              View all FAQs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div data-reveal="" data-delay="1" className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-border/60 bg-cream overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left px-7 py-5 flex items-center justify-between gap-4 font-serif text-lg hover:text-clay transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className={`shrink-0 w-7 h-7 rounded-full border border-border grid place-items-center transition-all duration-300 ${open === i ? "bg-clay text-ivory border-clay rotate-45" : ""}`}>
                    <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="6" y1="1" x2="6" y2="11" />
                      <line x1="1" y1="6" x2="11" y2="6" />
                    </svg>
                  </span>
                </button>
                {open === i && (
                  <div className="px-7 pb-6 text-muted-foreground leading-relaxed text-sm border-t border-border/50 pt-4 fade-in-up">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── STUDIO SECTION ── */
function StudioSection({ onBook }: { onBook: () => void }) {
  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div data-reveal="" className="flex items-center gap-3 mb-12">
          <span className="text-[10px] tracking-[0.35em] uppercase text-clay">Find Us</span>
          <span className="flex-1 h-px bg-border" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div data-reveal="">
            <h2 className="font-serif text-4xl lg:text-5xl text-balance">
              Come see where it's
              <span className="italic font-light"> all made.</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Our studio and kiln room sit in a quiet corner of Bangalore. We open our doors twice a year and accept scheduled appointments year-round.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { label: "Address", value: "42 Pottery Lane, Indiranagar, Bangalore 560001" },
                { label: "Phone", value: "+91 98765 43210" },
                { label: "Email", value: "studio@uchi.in" },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-4 text-sm">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground w-20 pt-0.5 shrink-0">{label}</span>
                  <span className="text-foreground">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="https://maps.google.com/?q=42+Pottery+Lane+Indiranagar+Bangalore"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic inline-flex items-center gap-2 rounded-full border border-bark text-bark px-6 py-3 text-sm hover:bg-bark hover:text-ivory transition-all"
              >
                <MapPin className="w-4 h-4" /> Open in Maps
              </a>
              <button
                onClick={onBook}
                className="magnetic inline-flex items-center gap-2 rounded-full bg-clay text-ivory px-6 py-3 text-sm hover:bg-clay-deep transition-colors"
              >
                Book a Visit <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Real studio image */}
          <div data-reveal="" data-delay="1" className="relative rounded-[2rem] overflow-hidden aspect-[4/3]">
            <img
              src={collectionNordic}
              alt="Uchi studio interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bark/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <p className="font-serif text-2xl text-ivory">Bangalore Studio</p>
                <p className="text-ivory/60 text-sm mt-1">42 Pottery Lane, Indiranagar</p>
              </div>
              <a
                href="https://maps.google.com/?q=42+Pottery+Lane+Indiranagar+Bangalore"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ivory/15 backdrop-blur border border-ivory/20 px-4 py-2.5 text-xs text-ivory hover:bg-ivory/25 transition"
              >
                Directions <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function ContactFooter() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-10 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Uchi Studio. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-clay transition">Home</Link>
          <Link to="/journal" className="hover:text-clay transition">Journal</Link>
          <Link to="/faqs" className="hover:text-clay transition">FAQs</Link>
          <Link to="/privacy" className="hover:text-clay transition">Privacy</Link>
          <Link to="/terms" className="hover:text-clay transition">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
