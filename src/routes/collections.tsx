import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Plus } from "lucide-react";
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
    productIds: ["bowl", "vase", "lamp"],
    accent: "bg-amber-100 text-amber-900",
  },
  {
    slug: "earth",
    name: "Earth",
    tagline: "Grounded materials. Deep craft.",
    story:
      "Solid wood, woven rattan, and turned ash — materials that carry the memory of their origins. Built to outlast trends and tell stories over decades.",
    image: earth,
    productIds: ["cabinet", "table", "floorlamp"],
    accent: "bg-orange-100 text-orange-900",
  },
  {
    slug: "nordic",
    name: "Nordic",
    tagline: "Form follows comfort.",
    story:
      "Clean geometry softened by natural textiles. Pieces that hold a room without shouting — made for long afternoons and slow mornings.",
    image: nordic,
    productIds: ["chair", "sofa"],
    accent: "bg-slate-100 text-slate-900",
  },
] as const;

function CollectionsPage() {
  const { addToCart, setCartOpen, setModalProduct } = useStore();

  return (
    <div className="bg-white text-foreground">
      <Nav />

      {/* Clean hero */}
      <section className="pt-32 pb-16 border-b border-border/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground">Collections</p>
          <h1 className="mt-3 font-serif text-6xl lg:text-7xl xl:text-8xl leading-tight text-balance">
            Three Moods.
          </h1>
          <p className="mt-6 max-w-2xl text-sm text-muted-foreground leading-relaxed">
            Each collection represents a distinct philosophy and aesthetic. Explore pieces curated to evoke a specific mood and bring intention to your everyday.
          </p>
        </div>
      </section>

      {/* Three-column grid of collection cards */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {collections.map((col, idx) => {
              const colProducts = col.productIds
                .map((id) => products.find((p) => p.id === id)!)
                .filter(Boolean);

              return (
                <div key={col.slug} className="group flex flex-col rounded-2xl overflow-hidden border border-border/60 hover:border-border transition-all duration-300 hover:shadow-2xl card-lift scale-in" style={{ animationDelay: `${idx * 0.15}s` }}>
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-sand/20">
                    <img
                      src={col.image}
                      alt={col.name}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-black/20 to-black/40 group-hover:from-black/20 group-hover:via-black/30 group-hover:to-black/50 transition-colors duration-500" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6 lg:p-7 space-y-4">
                    {/* Header */}
                    <div>
                      <h2 className="font-serif text-3xl lg:text-4xl text-foreground">{col.name}</h2>
                      <p className="text-sm italic text-muted-foreground mt-1.5">{col.tagline}</p>
                    </div>

                    {/* Story */}
                    <p className="text-sm leading-relaxed text-muted-foreground flex-1">
                      {col.story}
                    </p>

                    {/* Products grid */}
                    <div className="space-y-3 pt-2">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                        Pieces in this collection
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {colProducts.map((p, pidx) => (
                          <button
                            key={p.id}
                            onClick={() => setModalProduct(p)}
                            className="group/item flex flex-col scale-in hover:scale-110 transition-transform duration-300"
                            style={{ animationDelay: `${pidx * 0.1}s` }}
                          >
                            <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-sand/30 mb-2">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-full h-full object-cover group-hover/item:scale-125 transition-transform duration-500 ease-out"
                              />
                            </div>
                            <p className="text-[11px] font-medium text-foreground truncate leading-tight">
                              {p.name}
                            </p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{inr(p.price)}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Link
                        to="/products"
                        className="flex-1 flex items-center justify-center gap-2 rounded-full border-2 border-foreground text-foreground px-4 py-2.5 text-xs font-medium hover:bg-foreground hover:text-white transition-all duration-300 hover:shadow-lg hover:scale-105 group/shop"
                      >
                        Shop <ArrowRight className="w-3 h-3 group-hover/shop:translate-x-1 transition-transform" />
                      </Link>
                      <button
                        onClick={() => {
                          colProducts.forEach((p) => {
                            if (p.stock > 0) addToCart(p, 1);
                          });
                          setCartOpen(true);
                          toast.success(`${col.name} collection added to cart`);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 rounded-full bg-foreground text-white px-4 py-2.5 text-xs font-medium hover:bg-black transition-all duration-300 hover:shadow-lg hover:scale-105 group/add"
                      >
                        <Plus className="w-3 h-3 group-hover/add:rotate transition-transform duration-300" /> Add All
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-sand/40 border-t border-border/40">
        <div className="mx-auto max-w-2xl px-6 lg:px-10 text-center">
          <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground">Explore Further</p>
          <h2 className="mt-4 font-serif text-5xl lg:text-6xl text-foreground leading-tight">
            Browse all products.
          </h2>
          <p className="mt-5 text-muted-foreground text-sm leading-relaxed">
            See our complete catalogue with detailed filters, sorting options, and full product specifications.
          </p>
          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-foreground text-white px-8 py-4 text-sm font-medium hover:bg-black transition-colors"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <footer className="bg-white border-t border-border/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Uchi Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-foreground transition">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground transition">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
