import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Flag,
  Globe,
  Leaf,
  Package,
  Search,
  Sparkles,
  Star,
  Store,
  Instagram,
  Facebook,
  Twitter,
  ChevronUp,
  User,
  LogIn,
  Mail,
} from "lucide-react";

import { Nav } from "@/components/uchi/Nav";
import { ProductCard } from "@/components/uchi/ProductCard";
import {
  CartBody,
  ProductModal,
  SidePanel,
  WishBody,
  type CartItem,
} from "@/components/uchi/Drawers";
import { inr, products, type Product } from "@/components/uchi/data";

import hero from "@/assets/hero-ceramics.jpg";
import zen from "@/assets/collection-zen.jpg";
import earth from "@/assets/collection-earth.jpg";
import nordic from "@/assets/collection-nordic.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UCHI — Timeless Ceramics & Furniture for Everyday Living" },
      { name: "description", content: "UCHI crafts minimal, functional, hand-finished ceramics and furniture inspired by Japanese minimalism. Made for quiet, modern homes." },
      { property: "og:title", content: "UCHI — Timeless Ceramics & Furniture" },
      { property: "og:description", content: "Minimal. Functional. Beautifully crafted." },
    ],
  }),
  component: Home,
});

const categories = ["All", "Ceramics", "Lighting", "Seating", "Tables", "Storage"] as const;
type Cat = (typeof categories)[number];

function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wish, setWish] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [cat, setCat] = useState<Cat>("All");
  const [sort, setSort] = useState<"featured" | "low" | "high">("featured");
  const [showTop, setShowTop] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const addToCart = (p: Product, qty = 1) => {
    setCart((c) => {
      const i = c.findIndex((x) => x.product.id === p.id);
      if (i >= 0) {
        const copy = [...c];
        copy[i] = { ...copy[i], qty: copy[i].qty + qty };
        return copy;
      }
      return [...c, { product: p, qty }];
    });
    setCartOpen(true);
    toast.success(`${p.name} added to cart`);
  };
  const setQty = (id: string, q: number) =>
    setCart((c) => c.map((x) => (x.product.id === id ? { ...x, qty: q } : x)));
  const removeCart = (id: string) => setCart((c) => c.filter((x) => x.product.id !== id));
  const toggleWish = (id: string) => {
    setWish((w) => {
      const exists = w.includes(id);
      toast(exists ? "Removed from wishlist" : "Saved to wishlist");
      return exists ? w.filter((x) => x !== id) : [...w, id];
    });
  };

  const filtered = useMemo(() => {
    let list = cat === "All" ? products : products.filter((p) => p.category === cat);
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [cat, sort]);

  const wishedProducts = products.filter((p) => wish.includes(p.id));
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div id="top" className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav
        cartCount={cartCount}
        wishCount={wish.length}
        onCartClick={() => setCartOpen(true)}
        onWishClick={() => setWishOpen(true)}
        onSearchClick={() => setSearchOpen(true)}
        onAccountClick={() => setAccountOpen(true)}
      />

      <Hero mouse={mouse} />
      <Marquee />
      <About />
      <Products
        items={filtered}
        cat={cat}
        setCat={setCat}
        sort={sort}
        setSort={setSort}
        wish={wish}
        onAdd={addToCart}
        onWish={toggleWish}
        onOpen={setModalProduct}
      />
      <Collections />
      <Immersive />
      <Roadmap />
      <Testimonials />
      <Newsletter />
      <Footer />

      <SidePanel open={cartOpen} title={`Cart (${cartCount})`} onClose={() => setCartOpen(false)}>
        <CartBody items={cart} setQty={setQty} remove={removeCart} onCheckout={() => { setCartOpen(false); toast.success("Checkout opened — payment coming soon"); }} />
      </SidePanel>
      <SidePanel open={wishOpen} title="Wishlist" onClose={() => setWishOpen(false)}>
        <WishBody items={wishedProducts} remove={(id) => toggleWish(id)} add={(p) => { addToCart(p); setWishOpen(false); }} />
      </SidePanel>
      <SidePanel open={searchOpen} title="Search" onClose={() => setSearchOpen(false)}>
        <SearchBody
          onSelect={(p) => { setSearchOpen(false); setModalProduct(p); }}
        />
      </SidePanel>
      <SidePanel open={accountOpen} title="Account" onClose={() => setAccountOpen(false)}>
        <AccountBody onClose={() => setAccountOpen(false)} />
      </SidePanel>
      <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} onAdd={addToCart} />

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-bark text-ivory grid place-items-center shadow-lift transition-all duration-500 ${
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ mouse }: { mouse: { x: number; y: number } }) {
  const px = (mouse.x / (typeof window !== "undefined" ? window.innerWidth : 1) - 0.5) * 20;
  const py = (mouse.y / (typeof window !== "undefined" ? window.innerHeight : 1) - 0.5) * 20;
  return (
    <section id="home" className="relative min-h-[100svh] hero-grad overflow-hidden text-ivory">
      <div className="absolute inset-0 grain opacity-30 pointer-events-none" />
      {/* Floating particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-ivory/30 float-slow"
          style={{
            width: 4 + (i % 4) * 3,
            height: 4 + (i % 4) * 3,
            left: `${(i * 73) % 100}%`,
            top: `${(i * 41) % 90 + 5}%`,
            animationDelay: `${i * 0.4}s`,
            filter: "blur(1px)",
          }}
        />
      ))}

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 pt-44 pb-24 lg:pt-48 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 z-10">
          <div className="reveal inline-flex items-center gap-2 rounded-full bg-ivory/15 backdrop-blur-md border border-ivory/30 px-3.5 py-1.5 text-xs tracking-[0.25em] uppercase">
            <Sparkles className="w-3.5 h-3.5" /> New · Spring Collection
          </div>
          <h1 className="reveal reveal-delay-1 font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] mt-6 text-balance">
            Timeless Ceramics
            <span className="block italic font-light">for Everyday Living.</span>
          </h1>
          <p className="reveal reveal-delay-2 mt-6 max-w-md text-ivory/80 text-lg leading-relaxed">
            Minimal. Functional. Beautifully crafted — quiet objects made to be held, used,
            and kept for a lifetime.
          </p>
          <div className="reveal reveal-delay-3 mt-10 flex flex-wrap gap-4">
            <a
              href="#products"
              className="magnetic inline-flex items-center gap-3 rounded-full bg-ivory text-bark pl-6 pr-2 py-2 text-sm font-medium"
            >
              Explore Collection
              <span className="inline-grid place-items-center w-10 h-10 rounded-full bg-clay text-ivory">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </a>
            <a
              href="#story"
              className="magnetic inline-flex items-center gap-3 rounded-full border border-ivory/40 text-ivory px-6 py-3 text-sm hover:bg-ivory/10"
            >
              <span className="grid place-items-center w-7 h-7 rounded-full bg-ivory/20">▶</span>
              Watch Brand Story
            </a>
          </div>

          <dl className="reveal reveal-delay-4 mt-16 grid grid-cols-3 max-w-md gap-6 text-ivory/90">
            {[
              ["12+", "Years of craft"],
              ["80K", "Homes worldwide"],
              ["100%", "Hand finished"],
            ].map(([k, v]) => (
              <div key={v}>
                <dt className="font-serif text-3xl">{k}</dt>
                <dd className="text-[11px] uppercase tracking-[0.2em] mt-1 text-ivory/70">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-6 relative">
          <div
            className="reveal reveal-delay-2 relative aspect-[5/4] rounded-[2rem] overflow-hidden shadow-lift"
            style={{ transform: `perspective(1200px) rotateX(${-py * 0.2}deg) rotateY(${px * 0.2}deg)` }}
          >
            <img
              src={hero}
              alt="Handcrafted ceramic vase, bowl, and pot in warm light"
              width={1600}
              height={1200}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-ivory/20" />
          </div>

          {/* Floating spec card */}
          <div
            className="float-slow absolute -left-4 lg:-left-10 bottom-8 bg-ivory/95 text-bark backdrop-blur px-5 py-4 rounded-2xl shadow-lift hidden sm:flex items-center gap-4"
            style={{ transform: `translate(${px * 0.4}px, ${py * 0.4}px)` }}
          >
            <div className="w-10 h-10 rounded-full bg-clay text-ivory grid place-items-center">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Wood-fired</p>
              <p className="font-serif text-lg leading-tight">Tokoname kiln</p>
            </div>
          </div>

          <div
            className="float-slow absolute -right-2 top-8 bg-bark/70 backdrop-blur border border-ivory/20 px-4 py-3 rounded-xl text-ivory hidden sm:block"
            style={{ animationDelay: "1.4s", transform: `translate(${-px * 0.3}px, ${-py * 0.3}px)` }}
          >
            <p className="text-[10px] uppercase tracking-widest opacity-70">In Production</p>
            <p className="font-serif text-base">Spring '26</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- MARQUEE ---------------- */
function Marquee() {
  const words = ["Handcrafted", "Tokoname Kiln", "Solid Oak", "Mulberry Paper", "Bouclé", "Slow Made", "Lifetime Repair"];
  return (
    <div className="border-y border-border bg-cream py-6 overflow-hidden">
      <div className="marquee flex gap-16 whitespace-nowrap font-serif text-2xl text-bark/70">
        {[...words, ...words].map((w, i) => (
          <span key={i} className="flex items-center gap-16">
            {w}
            <span className="w-1.5 h-1.5 rounded-full bg-clay" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  const features = [
    { Icon: Leaf, t: "Timeless Design", d: "Forms that quietly outlast trend cycles." },
    { Icon: Package, t: "Functional Everyday", d: "Built for daily rituals, not display." },
    { Icon: Sparkles, t: "Made with Care", d: "Finished by a small studio of nine." },
  ];
  return (
    <section id="about" className="relative py-28 lg:py-40 bg-cream overflow-hidden">
      <DecorLeaves />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="text-[10px] tracking-[0.35em] uppercase text-clay">About Uchi</p>
        <div className="mx-auto mt-3 w-1.5 h-1.5 rounded-full bg-clay" />
        <h2 className="mt-6 font-serif text-5xl lg:text-6xl leading-tight text-balance">
          Crafted with Purpose.
          <span className="block italic">Made for Life.</span>
        </h2>
        <p className="mt-8 text-muted-foreground leading-relaxed text-lg">
          Uchi is a small homegrown studio celebrating the calm of Japanese minimalism and the
          honesty of timeless craftsmanship. Each piece is thoughtfully drawn, slowly made, and
          finished by hand — designed to bring quiet beauty and purpose into modern living.
        </p>

        <div className="mt-16 grid sm:grid-cols-3 gap-10 text-left sm:text-center">
          {features.map(({ Icon, t, d }) => (
            <div key={t} className="group">
              <div className="mx-auto w-14 h-14 rounded-full border border-clay/30 bg-ivory grid place-items-center text-clay group-hover:bg-clay group-hover:text-ivory transition-colors duration-500">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl mt-5">{t}</h3>
              <p className="text-sm text-muted-foreground mt-2">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DecorLeaves() {
  return (
    <>
      <svg className="absolute -left-10 top-10 w-48 opacity-40 text-clay/60" viewBox="0 0 100 200" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M50 0 C 50 60, 50 140, 50 200" />
        {Array.from({ length: 10 }).map((_, i) => (
          <g key={i} transform={`translate(50 ${20 + i * 18}) rotate(${i % 2 ? -35 : 35})`}>
            <ellipse cx={i % 2 ? -14 : 14} cy="0" rx="14" ry="5" />
          </g>
        ))}
      </svg>
      <svg className="absolute -right-10 bottom-10 w-56 opacity-40 text-clay/60 rotate-12" viewBox="0 0 100 200" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M50 0 C 50 60, 50 140, 50 200" />
        {Array.from({ length: 10 }).map((_, i) => (
          <g key={i} transform={`translate(50 ${20 + i * 18}) rotate(${i % 2 ? -35 : 35})`}>
            <ellipse cx={i % 2 ? -14 : 14} cy="0" rx="14" ry="5" />
          </g>
        ))}
      </svg>
    </>
  );
}

/* ---------------- PRODUCTS ---------------- */
function Products({
  items, cat, setCat, sort, setSort, wish, onAdd, onWish, onOpen,
}: {
  items: Product[];
  cat: Cat; setCat: (c: Cat) => void;
  sort: "featured" | "low" | "high"; setSort: (s: "featured" | "low" | "high") => void;
  wish: string[];
  onAdd: (p: Product) => void;
  onWish: (id: string) => void;
  onOpen: (p: Product) => void;
}) {
  return (
    <section id="products" className="py-28 lg:py-40 bg-background">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-col items-center text-center">
          <p className="text-[10px] tracking-[0.35em] uppercase text-clay">Our Products</p>
          <span className="mt-3 w-1.5 h-1.5 rounded-full bg-clay" />
          <h2 className="mt-6 font-serif text-5xl lg:text-6xl">Made for Everyday.</h2>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-sm border transition-all duration-300 ${
                  cat === c
                    ? "bg-bark text-ivory border-bark"
                    : "border-border text-muted-foreground hover:border-bark hover:text-foreground"
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
          {items.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              wished={wish.includes(p.id)}
              onAdd={onAdd}
              onWish={onWish}
              onOpen={onOpen}
            />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="#collections"
            className="magnetic inline-flex items-center gap-3 rounded-full bg-clay text-ivory pl-7 pr-2 py-2"
          >
            View All Products
            <span className="grid place-items-center w-10 h-10 rounded-full bg-bark">
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- COLLECTIONS ---------------- */
function Collections() {
  const items = [
    { t: "Zen Living", d: "Quiet rooms, low light, soft cushions.", img: zen, span: "lg:col-span-7" },
    { t: "Earth & Clay", d: "Raw glazes, kiln marks, honest matter.", img: earth, span: "lg:col-span-5" },
    { t: "Nordic Warmth", d: "Pale woods, knit textures, morning sun.", img: nordic, span: "lg:col-span-5" },
    { t: "Japandi Essentials", d: "The thirty pieces every home needs.", img: zen, span: "lg:col-span-7" },
  ];
  return (
    <section id="collections" className="py-28 lg:py-40 bg-cream">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-clay">Curated Collections</p>
            <h2 className="mt-4 font-serif text-5xl lg:text-6xl text-balance">A room for every quiet moment.</h2>
          </div>
          <a href="#products" className="text-sm underline underline-offset-4 hover:text-clay">Browse all collections →</a>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {items.map((c) => (
            <a
              key={c.t}
              href="#products"
              className={`group lift relative overflow-hidden rounded-3xl ${c.span} aspect-[4/3] block`}
            >
              <img src={c.img} alt={c.t} loading="lazy" className="img-zoom w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-bark/70 via-bark/10 to-transparent" />
              <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end text-ivory">
                <p className="text-[10px] tracking-[0.3em] uppercase opacity-80">Collection</p>
                <h3 className="font-serif text-3xl lg:text-4xl mt-2">{c.t}</h3>
                <p className="mt-2 opacity-90 max-w-sm">{c.d}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm">
                  Explore <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- IMMERSIVE ---------------- */
function Immersive() {
  return (
    <section id="story" className="relative py-32 lg:py-48 bg-bark text-ivory overflow-hidden">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(60% 50% at 30% 40%, oklch(0.55 0.14 35 / 0.6), transparent 70%), radial-gradient(50% 50% at 80% 70%, oklch(0.62 0.14 45 / 0.5), transparent 70%)",
        }}
      />
      <div className="grain absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="text-[10px] tracking-[0.4em] uppercase text-clay-soft">Our Philosophy</p>
        <h2 className="mt-6 font-serif text-5xl lg:text-7xl leading-[1.05] text-balance">
          Designed to bring calm, beauty,
          <span className="block italic text-clay-soft">and purpose into modern living.</span>
        </h2>
        <p className="mt-8 text-ivory/80 leading-relaxed">
          We believe in objects you can grow old with. Pieces that quiet a room. Materials
          that feel honest in the hand. Furniture and ceramics designed in India, finished
          one at a time, and built to be repaired — never replaced.
        </p>
      </div>
    </section>
  );
}

/* ---------------- ROADMAP ---------------- */
function Roadmap() {
  const steps = [
    { y: "2026", t: "Launch Year", d: "Our first collection of ceramics and essentials.", Icon: Flag },
    { y: "2027", t: "Expanding Collections", d: "More materials, more makers, better living.", Icon: Package },
    { y: "2028", t: "Building Presence", d: "Flagship studios in three Indian cities.", Icon: Store },
    { y: "2029", t: "Global Exploration", d: "Taking Uchi to select international markets.", Icon: Globe },
    { y: "2030", t: "Sustainable Tomorrow", d: "Closed-loop kilns and a repair-for-life programme.", Icon: Leaf },
    { y: "2031+", t: "Enduring Impact", d: "Creating lasting value in everyday living.", Icon: Star },
  ];
  return (
    <section className="py-28 lg:py-36 bg-background">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="text-center">
          <p className="text-[10px] tracking-[0.35em] uppercase text-clay">Our Path Ahead</p>
          <span className="mt-3 inline-block w-1.5 h-1.5 rounded-full bg-clay" />
          <h2 className="mt-6 font-serif text-5xl lg:text-6xl">The Road Ahead</h2>
        </div>

        <div className="relative mt-20">
          <div className="absolute left-0 right-0 top-7 h-px bg-border" />
          <div className="absolute left-0 top-7 h-px bg-clay" style={{ width: "65%" }} />
          <ol className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
            {steps.map(({ y, t, d, Icon }, i) => (
              <li key={y} className="relative text-center group">
                <div className="mx-auto w-14 h-14 rounded-full border border-clay/30 bg-ivory grid place-items-center text-clay relative z-10 group-hover:bg-clay group-hover:text-ivory transition-all duration-500">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="mt-4 mx-auto w-2 h-2 rounded-full bg-clay" />
                <p className="mt-5 font-serif text-2xl">{y}</p>
                <p className="mt-1 text-sm font-medium">{t}</p>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{d}</p>
                <span className="sr-only">Step {i + 1}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  const items = [
    { n: "Aiko M.", c: "Tokyo", q: "The bowl arrived wrapped in linen. It feels like it has always been on my shelf." },
    { n: "Rohan K.", c: "Mumbai", q: "I bought the dining table eight months ago. It only gets more beautiful." },
    { n: "Emilia S.", c: "Copenhagen", q: "Quiet, intentional, perfectly considered. Everything I want in a home object." },
    { n: "Yuki T.", c: "Kyoto", q: "The pendant softens the whole room. Worth every rupee, twice over." },
  ];
  return (
    <section className="py-28 lg:py-36 bg-cream">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h2 className="font-serif text-5xl lg:text-6xl">Held in homes worldwide.</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="w-4 h-4 fill-clay text-clay" />
            <span className="text-foreground font-medium">4.9</span> · 2,300 reviews
          </div>
        </div>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((t) => (
            <figure key={t.n} className="lift bg-ivory rounded-3xl p-7 border border-border/60">
              <div className="flex gap-1 text-clay">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <blockquote className="mt-5 font-serif text-xl leading-snug">"{t.q}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-clay/15 text-clay grid place-items-center font-serif">{t.n[0]}</span>
                <span>
                  <span className="block text-sm font-medium">{t.n}</span>
                  <span className="block text-xs text-muted-foreground">{t.c}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- NEWSLETTER ---------------- */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-[10px] tracking-[0.35em] uppercase text-clay">The Letter</p>
        <h2 className="mt-4 font-serif text-4xl lg:text-5xl">Slow notes from the studio.</h2>
        <p className="mt-4 text-muted-foreground">New pieces, kiln stories, and quiet rituals — once a month.</p>

        <form
          onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) setDone(true); }}
          className="mt-10 mx-auto max-w-lg flex flex-col sm:flex-row gap-2 p-1.5 bg-cream border border-border rounded-full shadow-soft"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@home.com"
            className="flex-1 bg-transparent px-5 py-3 outline-none text-sm"
          />
          <button
            type="submit"
            className="magnetic rounded-full bg-clay text-ivory px-7 py-3 text-sm font-medium"
          >
            {done ? "Subscribed ✓" : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  const cols: { t: string; items: { label: string; to: string }[] }[] = [
    {
      t: "Quick Links",
      items: [
        { label: "Home", to: "/" },
        { label: "About", to: "/about" },
        { label: "Products", to: "/products" },
        { label: "Journal", to: "/journal" },
        { label: "Contact", to: "/contact" },
      ],
    },
    {
      t: "Customer Care",
      items: [
        { label: "FAQs", to: "/faqs" },
        { label: "Shipping & Delivery", to: "/shipping" },
        { label: "Returns & Exchanges", to: "/returns" },
        { label: "Care Guide", to: "/care-guide" },
      ],
    },
    {
      t: "Policies",
      items: [
        { label: "Privacy", to: "/privacy" },
        { label: "Terms & Conditions", to: "/terms" },
        { label: "Cookies", to: "/cookies" },
        { label: "Sustainability", to: "/sustainability" },
      ],
    },
  ];
  const socials = [
    { I: Instagram, href: "https://instagram.com", label: "Instagram" },
    { I: Facebook, href: "https://facebook.com", label: "Facebook" },
    { I: Twitter, href: "https://twitter.com", label: "Twitter" },
  ];
  return (
    <footer id="contact" className="bg-cream border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-2 font-serif text-3xl italic">
            <span className="inline-block w-8 h-8 rounded-sm border-2 border-current relative">
              <span className="absolute inset-x-1 top-1 h-1 bg-current rounded-sm" />
            </span>
            uchi
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Timeless pieces, thoughtfully made for everyday living.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ I, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-10 h-10 rounded-full border border-border grid place-items-center hover:bg-clay hover:text-ivory hover:border-clay transition">
                <I className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.t}>
            <h4 className="font-serif text-lg">{c.t}</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {c.items.map((i) => (
                <li key={i.label}><Link to={i.to} className="hover:text-clay transition">{i.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Uchi Studio. All rights reserved.</p>
          <p>Designed in India · Finished by hand</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- SEARCH ---------------- */
function SearchBody({ onSelect }: { onSelect: (p: Product) => void }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return products.slice(0, 6);
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s),
    );
  }, [q]);
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 border border-border rounded-full px-4 py-3 bg-cream">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search ceramics, lighting, seating…"
          className="flex-1 bg-transparent outline-none text-sm"
        />
      </div>
      <p className="mt-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {results.length} result{results.length === 1 ? "" : "s"}
      </p>
      <ul className="mt-3 divide-y">
        {results.map((p) => (
          <li key={p.id}>
            <button
              onClick={() => onSelect(p)}
              className="w-full flex gap-4 py-4 text-left hover:bg-cream rounded-lg px-2 transition"
            >
              <img src={p.image} alt={p.name} className="w-14 h-16 object-cover rounded-md" />
              <div className="flex-1 min-w-0">
                <p className="font-serif text-lg truncate">{p.name}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{p.category}</p>
                <p className="mt-1 text-sm">{inr(p.price)}</p>
              </div>
            </button>
          </li>
        ))}
        {!results.length && (
          <li className="py-10 text-center text-sm text-muted-foreground">No matches. Try another word.</li>
        )}
      </ul>
    </div>
  );
}

/* ---------------- ACCOUNT ---------------- */
function AccountBody({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email.includes("@") || password.length < 4) {
          toast.error("Enter a valid email and password");
          return;
        }
        toast.success(`Welcome back, ${email.split("@")[0]}`);
        onClose();
      }}
      className="p-6 space-y-5"
    >
      <div className="w-16 h-16 mx-auto rounded-full bg-clay/15 text-clay grid place-items-center">
        <User className="w-7 h-7" />
      </div>
      <div className="text-center">
        <h3 className="font-serif text-2xl">Welcome to Uchi</h3>
        <p className="text-sm text-muted-foreground mt-1">Sign in to track orders and save favourites.</p>
      </div>
      <label className="block">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Email</span>
        <div className="mt-1 flex items-center gap-2 border border-border rounded-full px-4 py-3 bg-cream">
          <Mail className="w-4 h-4 text-muted-foreground" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@home.com"
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>
      </label>
      <label className="block">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Password</span>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="mt-1 w-full border border-border rounded-full px-4 py-3 bg-cream outline-none text-sm"
        />
      </label>
      <button
        type="submit"
        className="w-full magnetic rounded-full bg-clay text-ivory py-3.5 font-medium inline-flex items-center justify-center gap-2"
      >
        <LogIn className="w-4 h-4" /> Sign In
      </button>
      <button
        type="button"
        onClick={() => toast("Account creation coming soon")}
        className="w-full rounded-full border border-bark text-bark py-3.5 font-medium hover:bg-bark hover:text-ivory transition"
      >
        Create an Account
      </button>
      <p className="text-xs text-center text-muted-foreground">
        By continuing you agree to our terms and privacy policy.
      </p>
    </form>
  );
}
