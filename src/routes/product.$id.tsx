import { useMemo, useState } from "react";
import { Link, createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import {
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { toast } from "sonner";

import { Nav } from "@/components/uchi/Nav";
import { ProductCard } from "@/components/uchi/ProductCard";
import {
  getProductById,
  getRelatedProducts,
  inr,
  type Product,
} from "@/components/uchi/data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProductById(params.id);
    if (!product) throw notFound();
    return { product, related: getRelatedProducts(params.id) };
  },
  head: ({ params, loaderData }) => {
    const product = loaderData?.product;
    if (!product) {
      return {
        meta: [
          { title: "Product not found — Uchi" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${product.name} — ${product.category} | Uchi`;
    const description =
      product.longDescription ?? product.description;
    const url = `/product/${product.id}`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        // Open Graph
        { property: "og:type", content: "product" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:image", content: product.image },
        { property: "product:price:amount", content: String(product.price) },
        { property: "product:price:currency", content: "INR" },
        {
          property: "product:availability",
          content: product.stock > 0 ? "in stock" : "out of stock",
        },
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: product.image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description,
            image: [product.image, ...(product.gallery ?? [])],
            sku: product.id,
            category: product.category,
            brand: { "@type": "Brand", name: "Uchi" },
            offers: {
              "@type": "Offer",
              url,
              priceCurrency: "INR",
              price: product.price,
              availability:
                product.stock > 0
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
              itemCondition: "https://schema.org/NewCondition",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: product.reviewCount,
            },
            review: (product.reviews ?? []).map((r) => ({
              "@type": "Review",
              author: { "@type": "Person", name: r.author },
              datePublished: r.date,
              name: r.title,
              reviewBody: r.body,
              reviewRating: {
                "@type": "Rating",
                ratingValue: r.rating,
                bestRating: 5,
              },
            })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Products", item: "/products" },
              {
                "@type": "ListItem",
                position: 3,
                name: product.name,
                item: url,
              },
            ],
          }),
        },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <div className="pt-40 pb-32 text-center px-6">
        <p className="text-[10px] tracking-[0.35em] uppercase text-clay">404</p>
        <h1 className="mt-4 font-serif text-5xl">Product not found</h1>
        <p className="mt-4 text-muted-foreground">The piece you're looking for has moved or sold out.</p>
        <Link to="/products" className="mt-8 inline-flex items-center gap-2 rounded-full bg-bark text-ivory px-6 py-3 text-sm">
          Back to all products
        </Link>
      </div>
    </div>
  ),
});

function ProductPage() {
  const { product, related } = Route.useLoaderData() as {
    product: Product;
    related: Product[];
  };
  const navigate = useNavigate();
  const { addToCart, wish, toggleWish, setCartOpen, setWishOpen } = useStore();
  const wished = wish.includes(product.id);

  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const gallery = useMemo(
    () =>
      product.gallery && product.gallery.length > 0
        ? product.gallery
        : [product.image],
    [product]
  );

  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) *
            100
        )
      : 0;

  const handleAdd = () => {
    addToCart(product, qty);
    toast.success(`${product.name} added to cart`);
    setCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    toast.success(`${product.name} added to cart`);
  };

  const handleWish = () => {
    const isWished = wish.includes(product.id);
    toggleWish(product.id);
    toast(isWished ? "Removed from wishlist" : "Saved to wishlist");
    if (!isWished) setWishOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="pt-28 lg:pt-32">
        <ol className="mx-auto max-w-[1400px] px-6 lg:px-10 flex items-center gap-2 text-xs text-muted-foreground">
          <li>
            <Link to="/" className="hover:text-clay transition">Home</Link>
          </li>
          <ChevronRight className="w-3 h-3" />
          <li>
            <Link to="/products" className="hover:text-clay transition">Products</Link>
          </li>
          <ChevronRight className="w-3 h-3" />
          <li className="text-foreground truncate max-w-[60vw]">{product.name}</li>
        </ol>
      </nav>

      {/* Product hero */}
      <section className="mx-auto max-w-[1400px] px-6 lg:px-10 py-10 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div>
            <div className="aspect-[4/5] bg-sand rounded-3xl overflow-hidden">
              <img
                src={gallery[activeImage]}
                alt={`${product.name} — view ${activeImage + 1}`}
                width={1200}
                height={1500}
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {gallery.map((src, i) => (
                  <button
                    key={src + i}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition ${
                      i === activeImage ? "border-clay" : "border-transparent hover:border-border"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <p className="text-[10px] tracking-[0.35em] uppercase text-clay">
              {product.category}
            </p>
            <h1 className="mt-3 font-serif text-4xl lg:text-6xl leading-tight">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(product.rating)
                        ? "fill-clay text-clay"
                        : "text-border"
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                {product.rating.toFixed(1)} · {product.reviewCount} reviews
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-serif text-4xl">{inr(product.price)}</span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <>
                  <span className="text-muted-foreground line-through">
                    {inr(product.compareAtPrice)}
                  </span>
                  <span className="text-xs font-medium tracking-wide px-2 py-1 rounded-full bg-clay/10 text-clay">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Inclusive of all taxes · Complimentary shipping within India
            </p>

            <p className="mt-6 text-muted-foreground leading-relaxed">
              {product.longDescription ?? product.description}
            </p>

            {/* Stock */}
            <div className="mt-6 flex items-center gap-2 text-sm">
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  product.stock > 0 ? "bg-emerald-600" : "bg-destructive"
                }`}
              />
              {product.stock > 5 && <span>In stock — ready to ship</span>}
              {product.stock > 0 && product.stock <= 5 && (
                <span>Only {product.stock} left in stock</span>
              )}
              {product.stock === 0 && (
                <span className="text-destructive">Sold out</span>
              )}
            </div>

            {/* Qty + actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center border border-border rounded-full">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="p-3 hover:text-clay transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-medium" aria-live="polite">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))}
                  aria-label="Increase quantity"
                  className="p-3 hover:text-clay transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                disabled={product.stock === 0}
                className="flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 rounded-full bg-bark text-ivory px-6 py-4 text-sm font-medium hover:bg-clay transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 min-w-[180px] rounded-full border border-bark text-bark px-6 py-4 text-sm font-medium hover:bg-bark hover:text-ivory transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
              <button
                onClick={handleWish}
                aria-pressed={wished}
                aria-label="Add to wishlist"
                className={`w-12 h-12 rounded-full grid place-items-center border transition ${
                  wished
                    ? "bg-clay text-ivory border-clay"
                    : "border-border hover:border-clay hover:text-clay"
                }`}
              >
                <Heart className="w-5 h-5" fill={wished ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Trust strip */}
            <ul className="mt-8 grid grid-cols-2 gap-3 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-clay" /> Free shipping in India
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-clay" /> Lifetime repair guarantee
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Specs */}
      {product.specs && product.specs.length > 0 && (
        <section className="bg-cream border-y border-border">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 lg:py-20 grid lg:grid-cols-3 gap-10">
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase text-clay">Specifications</p>
              <h2 className="mt-3 font-serif text-3xl lg:text-4xl">The details.</h2>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Honest materials, simple joinery, slow finishing. Every spec below is
                checked twice before a piece leaves the studio.
              </p>
            </div>
            <dl className="lg:col-span-2 grid sm:grid-cols-2 gap-x-10">
              {product.specs.map((s) => (
                <div key={s.label} className="py-4 border-b border-border/60">
                  <dt className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                    {s.label}
                  </dt>
                  <dd className="mt-1.5 font-serif text-lg">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase text-clay">Reviews</p>
              <h2 className="mt-3 font-serif text-3xl lg:text-4xl">What people say.</h2>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(product.rating)
                        ? "fill-clay text-clay"
                        : "text-border"
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                {product.rating.toFixed(1)} out of 5 · {product.reviewCount} reviews
              </span>
            </div>
          </div>

          <ul className="mt-10 grid md:grid-cols-3 gap-6">
            {product.reviews.map((r) => (
              <li
                key={r.id}
                className="bg-ivory border border-border/60 rounded-2xl p-6"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < r.rating ? "fill-clay text-clay" : "text-border"
                      }`}
                    />
                  ))}
                </div>
                <h3 className="mt-3 font-serif text-xl">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {r.body}
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  — {r.author}, {r.date}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-cream border-t border-border">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 lg:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-serif text-3xl lg:text-4xl">You may also like.</h2>
              <Link
                to="/products"
                className="text-sm underline-offset-4 hover:underline hover:text-clay transition"
              >
                Browse all products →
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  wished={wish.includes(p.id)}
                  onAdd={(p) => { addToCart(p); toast.success(`${p.name} added to cart`); setCartOpen(true); }}
                  onWish={(id) => { const ex = wish.includes(id); toggleWish(id); toast(ex ? "Removed from wishlist" : "Saved to wishlist"); }}
                  onOpen={() => navigate({ to: "/product/$id", params: { id: p.id } })}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-background border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-12 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Uchi. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-clay transition">Privacy</Link>
            <Link to="/terms" className="hover:text-clay transition">Terms</Link>
            <Link to="/shipping" className="hover:text-clay transition">Shipping</Link>
            <Link to="/returns" className="hover:text-clay transition">Returns</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
