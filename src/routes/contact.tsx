import { Link, createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/uchi/Nav";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email.includes("@") || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Message sent! We will get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      <section className="pt-32 pb-20 bg-cream">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 text-center">
          <p className="text-[10px] tracking-[0.35em] uppercase text-clay">Get in Touch</p>
          <h1 className="mt-4 font-serif text-5xl lg:text-7xl text-balance">We would love to hear from you.</h1>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-serif text-3xl">Send us a message</h2>
            <p className="mt-3 text-muted-foreground">Whether you have a question about a piece, an order, or just want to say hello.</p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Name</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="mt-1 w-full border border-border rounded-xl px-4 py-3 bg-cream outline-none text-sm"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="mt-1 w-full border border-border rounded-xl px-4 py-3 bg-cream outline-none text-sm"
                  placeholder="you@home.com"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Message</span>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  rows={5}
                  className="mt-1 w-full border border-border rounded-xl px-4 py-3 bg-cream outline-none text-sm resize-none"
                  placeholder="How can we help?"
                />
              </label>
              <button
                type="submit"
                className="magnetic inline-flex items-center gap-2 rounded-full bg-clay text-ivory px-8 py-3.5 text-sm font-medium"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>

          <div className="space-y-10">
            <div className="bg-cream rounded-3xl p-8 border border-border/60">
              <div className="w-12 h-12 rounded-full bg-clay/15 text-clay grid place-items-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl mt-5">Email</h3>
              <p className="mt-1 text-muted-foreground">hello@uchi.studio</p>
              <p className="mt-1 text-sm text-muted-foreground">We typically reply within 24 hours.</p>
            </div>
            <div className="bg-cream rounded-3xl p-8 border border-border/60">
              <div className="w-12 h-12 rounded-full bg-clay/15 text-clay grid place-items-center">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl mt-5">Phone</h3>
              <p className="mt-1 text-muted-foreground">+91 98765 43210</p>
              <p className="mt-1 text-sm text-muted-foreground">Mon–Fri, 10am – 6pm IST.</p>
            </div>
            <div className="bg-cream rounded-3xl p-8 border border-border/60">
              <div className="w-12 h-12 rounded-full bg-clay/15 text-clay grid place-items-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl mt-5">Studio</h3>
              <p className="mt-1 text-muted-foreground">42 Pottery Lane, Bangalore 560001</p>
              <p className="mt-1 text-sm text-muted-foreground">Visits by appointment only.</p>
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
