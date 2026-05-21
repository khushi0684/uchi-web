import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/uchi/Nav";
import { inr, products } from "@/components/uchi/data";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

import zen from "@/assets/collection-zen.jpg";
import earth from "@/assets/collection-earth.jpg";
import nordic from "@/assets/collection-nordic.jpg";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — Uchi Studio" },
      { name: "description", content: "Three curated collections — Zen, Earth, and Nordic — each a distinct mood for everyday living." },
      { property: "og:title", content: "Collections — Uchi Studio" },
    ],
  }),
  component: CollectionsPage,
});

const collections = [
  {
    slug: "zen",
    name: "Zen",
    tagline: "Stillness in every object.",
    story:
      "Drawn from the Japanese wabi-sabi tradition — beauty found in imperfection, impermanence, and simplicity. Each piece invites you to slow down.",
    image: zen,
    accent: "bg-[#e8e0d8]",
    productIds: ["bowl", "vase", "lamp"],
  },
  {
    slug: "earth",
    name: "Earth",
    tagline: "Grounded materials. Deep craft.",
    story:
      "Solid wood, woven rattan, and turned ash — materials that carry the memory of their origins. Built to outlast trends and tell stories over decades.",
    image: earth,
    accent: "bg-[#d6cec4]",
    productIds: ["cabinet", "table", "floorlamp"],
  },
  {
    slug: "nordic",
    name: "Nordic",
    tagline: "Form follows comfort.",
    story:
      "Clean geometry softened by natural textiles. Pieces that hold a room without shouting — made for long afternoons and slow mornings.",
    image: nordic,
    accent: "bg-[#ddd8d0]",
    productIds: ["chair", "sofa"],
  },
] as const;

function CollectionsPage() {
  const { addToCart, setCartOpen, setModalProduct, wish, toggleWish } = useStore();

  return (
    <div className="min-h-screen bg-bark text-ivory">
      <Nav />

      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-end pb-20 pt-48 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bark via-bark/95 to-bark/80 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.4em] uppercase text-clay-soft mb-5">
            Uchi Studio
          </p>
          <h1 className="font-serif text-6xl lg:text-8xl leading-none text-balance">
            Our<br />
            <em className="not-italic text-clay-soft">Collections</em>
          </h1>
          <p className="mt-8 text-ivory/60 leading-relaxed max-w-sm mx-auto">
            Three distinct moods. One quiet philosophy — that the objects around you should be worth living with.
          </p>
        </div>
        {/* Decorative line */}
        <div className="relative z-10 mt-16 w-px h-16 bg-gradient-to-b from-clay-soft to-transparent mx-auto" />
      </section>

      {/* ── Collection sections ── */}
      {collections.map((col, idx) => {
        const colProducts = col.productIds.map((id) => products.find((p) => p.id === id)!).filter(Boolean);
        const isEven = idx % 2 === 0;

        return (
          <section key={col.slug} className="relative">
            <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}>

              {/* Image half */}
              <div className="lg:w-1/2 relative overflow-hidden" style={{ minHeight: "70vh" }}>
                <img
                  src={col.image}
                  alt={col.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className={`absolute inset-0 ${isEven ? "bg-gradient-to-r" : "bg-gradient-to-l"} from-bark/30 to-transparent`} />
                {/* Collection number */}
                <span className="absolute top-8 left-8 font-serif text-7xl text-ivory/10 leading-none select-none">
                  0{idx + 1}
                </span>
              </div>

              {/* Content half */}
              <div className={`lg:w-1/2 flex flex-col justify-center px-10 lg:px-20 py-20 ${col.accent} text-bark`}>
                <p className="text-[10px] tracking-[0.4em] uppercase text-clay">
                  Collection {String(idx + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-4 font-serif text-6xl lg:text-7xl">{col.name}</h2>
                <p className="mt-3 text-xl font-light text-bark/70 italic">{col.tagline}</p>
                <p className="mt-6 text-sm leading-relaxed text-bark/60 max-w-sm">{col.story}</p>

                {/* Product strip */}
                <div className="mt-10 flex gap-5 overflow-x-auto pb-1 -mx-1 px-1">
                  {colProducts.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setModalProduct(p)}
                      className="group flex-shrink-0 w-36 text-left"
                    >
                      <div className="w-36 h-44 rounded-2xl overflow-hidden bg-white/20">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      </div>
                      <p className="mt-3 text-sm font-medium truncate">{p.name}</p>
                      <p className="text-xs text-bark/50 mt-0.5">{inr(p.price)}</p>
                    </button>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-10 flex flex-wrap gap-3">
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 rounded-full bg-bark text-ivory px-6 py-3 text-sm font-medium hover:bg-clay transition"
                  >
                    Shop {col.name} <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => {
                      colProducts.forEach((p) => {
                        if (p.stock > 0) addToCart(p, 1);
                      });
                      setCartOpen(true);
                      toast.success(`${col.name} collection added to cart`);
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-bark/30 text-bark px-6 py-3 text-sm font-medium hover:bg-bark/10 transition"
                  >
                    Add All to Cart
                  </button>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── Bottom CTA ── */}
      <section className="py-32 text-center px-6 bg-bark">
        <p className="text-[10px] tracking-[0.4em] uppercase text-clay-soft">Browse Everything</p>
        <h2 className="mt-4 font-serif text-5xl lg:text-6xl text-ivory">
          Can't decide?
        </h2>
        <p className="mt-4 text-ivory/50 max-w-sm mx-auto text-sm leading-relaxed">
          See the full catalogue — filter by category, sort by price, find the one.
        </p>
        <Link
          to="/products"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-clay text-ivory px-8 py-4 text-sm font-medium hover:bg-clay-deep transition magnetic"
        >
          View All Products <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      <footer className="border-t border-ivory/10">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-8 flex flex-wrap items-center justify-between gap-3 text-xs text-ivory/30">
          <p>© {new Date().getFullYear()} Uchi Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-clay-soft transition">Privacy</Link>
            <Link to="/terms" className="hover:text-clay-soft transition">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
