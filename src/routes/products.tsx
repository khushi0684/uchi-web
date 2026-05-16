import { Link, createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/uchi/Nav";
import { ProductCard } from "@/components/uchi/ProductCard";
import { products } from "@/components/uchi/data";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Uchi Studio" },
      { name: "description", content: "Browse our collection of handcrafted ceramics, lighting, seating, tables, and storage." },
      { property: "og:title", content: "Products — Uchi Studio" },
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
  const [wish, setWish] = useState<string[]>([]);

  const filtered = (() => {
    let list = cat === "All" ? products : products.filter((p) => p.category === cat);
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  })();

  const toggleWish = (id: string) => {
    setWish((w) => {
      const exists = w.includes(id);
      toast(exists ? "Removed from wishlist" : "Saved to wishlist");
      return exists ? w.filter((x) => x !== id) : [...w, id];
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav cartCount={0} wishCount={wish.length} onCartClick={() => toast("Cart is available on the home page")} onWishClick={() => toast("Wishlist is available on the home page")} onSearchClick={() => toast("Search is available on the home page")} onAccountClick={() => toast("Account is available on the home page")} />

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
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-4 py-2 rounded-full text-sm border transition-all duration-300 ${
                    cat === c ? "bg-bark text-ivory border-bark" : "border-border text-muted-foreground hover:border-bark hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                wished={wish.includes(p.id)}
                onAdd={() => toast.success(`${p.name} added to cart`)}
                onWish={toggleWish}
                onOpen={() => toast(`${p.name} — quick view coming soon`)}
              />
            ))}
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
