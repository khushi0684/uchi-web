import { Link, createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/uchi/Nav";
import { ProductCard } from "@/components/uchi/ProductCard";
import { products } from "@/components/uchi/data";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Uchi" },
      { name: "description", content: "Browse our collection of handcrafted ceramics, lighting, seating, tables, and storage." },
      { property: "og:title", content: "Products — Uchi" },
      { property: "og:description", content: "Minimal, functional, beautifully crafted pieces for everyday living." },
    ],
  }),
  component: ProductsPage,
});

const categories = ["All", "Ceramics", "Lighting", "Seating", "Tables", "Storage"] as const;
type Cat = (typeof categories)[number];

function ProductsPage() {
  const [cat, setCat] = useState<Cat>("All");
  const [sort, setSort] = useState<"featured" | "low" | "high">("featured");
  const { addToCart, wish, toggleWish, setModalProduct, setCartOpen } = useStore();

  const filtered = useMemo(() => {
    let list = cat === "All" ? products : products.filter((p) => p.category === cat);
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [cat, sort]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      <section className="pt-32 pb-20 bg-cream">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 text-center">
          <p className="text-[10px] tracking-[0.35em] uppercase text-clay">Our Products</p>
          <h1 className="mt-4 font-serif text-5xl lg:text-7xl text-balance">Made for Everyday.</h1>
          <p className="mt-6 max-w-xl mx-auto text-muted-foreground leading-relaxed">
            Minimal, functional, beautifully crafted — quiet objects made to be held, used, and kept for a lifetime.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-4 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                    cat === c
                      ? "bg-bark text-ivory border-bark shadow-md"
                      : "border-border text-muted-foreground hover:border-bark hover:text-foreground hover:bg-sand/30"
                  } active:scale-95`}
                >
                  {c}
                </button>
              ))}
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium transition-all hover:border-bark focus:border-clay focus:ring-2 focus:ring-clay/20"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">{filtered.length} results</p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                wished={wish.includes(p.id)}
                onAdd={(p) => { addToCart(p); toast.success(`${p.name} added to cart`); setCartOpen(true); }}
                onWish={(id) => {
                  const exists = wish.includes(id);
                  toggleWish(id);
                  toast(exists ? "Removed from wishlist" : "Saved to wishlist");
                }}
                onOpen={(p) => setModalProduct(p)}
              />
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
