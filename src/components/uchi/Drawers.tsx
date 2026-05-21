import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, LogIn, Mail, Minus, Plus, Search, Star, Trash2, User, X, Heart } from "lucide-react";
import { toast } from "sonner";
import { inr, products, type Product } from "./data";
import type { CartItem } from "@/lib/store";
export type { CartItem };

export function SidePanel({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-bark/40 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full sm:w-[440px] bg-ivory text-bark shadow-lift
          transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)]
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 h-20 border-b">
          <h3 className="font-serif text-2xl">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-sand">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="h-[calc(100%-5rem)] overflow-y-auto">{children}</div>
      </aside>
    </>
  );
}

export function CartBody({
  items,
  setQty,
  remove,
  onCheckout,
}: {
  items: CartItem[];
  setQty: (id: string, q: number) => void;
  remove: (id: string) => void;
  onCheckout?: () => void;
}) {
  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const [checking, setChecking] = useState(false);

  if (!items.length) {
    return (
      <div className="p-10 text-center text-muted-foreground flex flex-col items-center justify-center h-full">
        <div className="w-12 h-12 rounded-full bg-clay/15 text-clay grid place-items-center mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 20a2 2 0 100-4 2 2 0 000 4Z" />
          </svg>
        </div>
        <p className="font-serif text-2xl text-foreground">Your cart is quiet.</p>
        <p className="mt-2 text-sm">Add a piece you'll keep for years.</p>
      </div>
    );
  }

  const handleCheckout = async () => {
    setChecking(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    setChecking(false);
    onCheckout?.();
  };

  return (
    <div className="flex flex-col h-full">
      <ul className="flex-1 divide-y overflow-y-auto">
        {items.map(({ product, qty }, idx) => (
          <li key={product.id} style={{ animationDelay: `${idx * 40}ms` }} className="p-6 flex gap-4 slide-in-left hover:bg-sand/20 transition-colors">
            <div className="relative flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden bg-sand">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex justify-between gap-3 mb-1">
                <h4 className="font-serif text-lg leading-tight">{product.name}</h4>
                <button
                  onClick={() => remove(product.id)}
                  className="text-muted-foreground hover:text-red-500 transition-colors active:scale-90"
                  aria-label="Remove from cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{product.category}</p>
              <div className="mt-auto flex items-center justify-between pt-2">
                <div className="inline-flex items-center border border-border rounded-full bg-cream">
                  <button
                    onClick={() => setQty(product.id, Math.max(1, qty - 1))}
                    className="p-1.5 text-muted-foreground hover:text-foreground transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-sm font-medium">{qty}</span>
                  <button
                    onClick={() => setQty(product.id, qty + 1)}
                    className="p-1.5 text-muted-foreground hover:text-foreground transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <span className="font-medium text-lg">{inr(product.price * qty)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="border-t p-6 space-y-4 bg-cream/50">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">{inr(total)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium text-green-600">Free</span>
          </div>
          <div className="h-px bg-border" />
          <div className="flex justify-between font-serif text-2xl pt-1">
            <span>Total</span>
            <span>{inr(total)}</span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={checking}
          className={`w-full magnetic rounded-full py-4 font-medium tracking-wide transition-all ${
            checking
              ? "bg-clay/60 text-ivory/70 btn-loading"
              : "bg-clay text-ivory hover:bg-clay-deep active:scale-98"
          }`}
        >
          {checking ? "Processing..." : "Proceed to Checkout"}
        </button>
        <p className="text-xs text-center text-muted-foreground">Complimentary shipping within India</p>
      </div>
    </div>
  );
}

export function WishBody({
  items,
  remove,
  add,
}: {
  items: Product[];
  remove: (id: string) => void;
  add: (p: Product) => void;
}) {
  if (!items.length) {
    return (
      <div className="p-10 text-center text-muted-foreground flex flex-col items-center justify-center h-full">
        <div className="w-12 h-12 rounded-full bg-clay/15 text-clay grid place-items-center mb-4">
          <Heart className="w-6 h-6" />
        </div>
        <p className="font-serif text-2xl text-foreground">No favourites yet.</p>
        <p className="mt-2 text-sm">Tap the heart on any piece.</p>
      </div>
    );
  }

  return (
    <ul className="divide-y">
      {items.map((p, idx) => (
        <li key={p.id} style={{ animationDelay: `${idx * 40}ms` }} className="p-6 flex gap-4 slide-in-left hover:bg-sand/20 transition-colors">
          <div className="relative flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden bg-sand">
            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
            {p.stock === 0 && <div className="absolute inset-0 bg-bark/20" />}
          </div>
          <div className="flex-1 flex flex-col">
            <h4 className="font-serif text-lg">{p.name}</h4>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mt-0.5">{p.category}</p>
            <p className="text-sm font-medium mt-1">{inr(p.price)}</p>
            <div className="mt-auto flex gap-2 pt-3">
              <button
                onClick={() => add(p)}
                disabled={p.stock === 0}
                className="flex-1 rounded-full bg-bark text-ivory text-xs px-3 py-2 font-medium magnetic transition-all hover:bg-clay disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {p.stock > 0 ? "Add to Cart" : "Sold Out"}
              </button>
              <button
                onClick={() => remove(p.id)}
                className="flex-1 rounded-full border border-border text-xs px-3 py-2 font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function ProductModal({
  product,
  onClose,
  onAdd,
}: {
  product: Product | null;
  onClose: () => void;
  onAdd: (p: Product, qty: number) => void;
}) {
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [addingCart, setAddingCart] = useState(false);
  const [buyingNow, setBuyingNow] = useState(false);

  useEffect(() => {
    if (product) { setGalleryIdx(0); setQty(1); }
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setGalleryIdx(i => (i - 1 + (product.gallery?.length || 1)) % (product.gallery?.length || 1));
      if (e.key === "ArrowRight") setGalleryIdx(i => (i + 1) % (product.gallery?.length || 1));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [product, onClose]);

  if (!product) return null;

  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const isSoldOut = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 3;

  const prev = () => setGalleryIdx((i) => (i - 1 + gallery.length) % gallery.length);
  const next = () => setGalleryIdx((i) => (i + 1) % gallery.length);

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-4 sm:p-8" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-bark/50 backdrop-blur-md animate-in fade-in" onClick={onClose} />
      <div className="relative w-full max-w-5xl bg-ivory rounded-3xl overflow-hidden grid md:grid-cols-2 shadow-lift animate-in zoom-in-95 fade-in duration-500 max-h-[90svh]">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-ivory/90 grid place-items-center">
          <X className="w-5 h-5" />
        </button>

        {/* Gallery */}
        <div className="relative bg-sand overflow-hidden aspect-square md:aspect-auto">
          <img
            key={galleryIdx}
            src={gallery[galleryIdx]}
            alt={`${product.name} — view ${galleryIdx + 1}`}
            className="w-full h-full object-cover animate-in fade-in duration-300"
          />
          {gallery.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-ivory/80 backdrop-blur grid place-items-center hover:bg-ivory transition"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-ivory/80 backdrop-blur grid place-items-center hover:bg-ivory transition"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setGalleryIdx(i)}
                    aria-label={`Image ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === galleryIdx ? "bg-ivory w-4" : "bg-ivory/50 w-1.5"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          {isSoldOut && (
            <div className="absolute inset-0 bg-bark/40 backdrop-blur-[1px] flex items-center justify-center">
              <span className="bg-ivory/90 text-bark text-sm tracking-[0.2em] uppercase px-4 py-2 rounded-full">
                Sold Out
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-8 md:p-10 flex flex-col overflow-y-auto">
          <span className="text-[10px] tracking-[0.3em] uppercase text-clay">{product.category}</span>
          <h2 className="font-serif text-3xl md:text-4xl mt-2 leading-tight">{product.name}</h2>

          <div className="mt-2 flex items-center gap-2">
            <div className="flex gap-0.5 text-clay">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "fill-current" : "opacity-25"}`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {product.rating} · {product.reviewCount} reviews
            </span>
          </div>

          <p className="mt-4 text-muted-foreground leading-relaxed text-sm">{product.description}</p>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-serif text-3xl">{inr(product.price)}</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-muted-foreground line-through text-sm">{inr(product.compareAtPrice)}</span>
            )}
          </div>

          {isLowStock && (
            <p className="mt-1.5 text-xs text-clay font-medium">Only {product.stock} left in stock — order soon</p>
          )}

          {product.specs && product.specs.length > 0 && (
            <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-border pt-5">
              {product.specs.map((s) => (
                <div key={s.label}>
                  <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</dt>
                  <dd className="text-sm mt-0.5 font-medium">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-auto pt-6 space-y-3">
            {!isSoldOut && (
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Qty</span>
                <div className="inline-flex items-center border border-border rounded-full">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="p-2.5 text-muted-foreground hover:text-foreground transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                    className="p-2.5 text-muted-foreground hover:text-foreground transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={async () => {
                  if (!isSoldOut) {
                    setAddingCart(true);
                    await new Promise(resolve => setTimeout(resolve, 400));
                    setAddingCart(false);
                    onAdd(product, qty);
                    onClose();
                  }
                }}
                disabled={isSoldOut || addingCart || buyingNow}
                className={`flex-1 magnetic rounded-full py-4 font-medium transition-all ${
                  isSoldOut
                    ? "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                    : addingCart
                      ? "bg-clay/60 text-ivory/70 btn-loading"
                      : "bg-clay text-ivory hover:bg-clay-deep active:scale-95"
                }`}
              >
                {addingCart ? "Adding..." : isSoldOut ? "Sold Out" : "Add to Cart"}
              </button>
              {!isSoldOut && (
                <button
                  onClick={async () => {
                    setBuyingNow(true);
                    await new Promise(resolve => setTimeout(resolve, 500));
                    setBuyingNow(false);
                    onAdd(product, qty);
                    toast("Proceeding to checkout…");
                    onClose();
                  }}
                  disabled={addingCart || buyingNow}
                  className={`flex-1 rounded-full border-2 py-4 font-medium transition-all ${
                    buyingNow
                      ? "border-clay bg-clay/10 text-clay/70 btn-loading"
                      : "border-bark text-bark hover:bg-bark hover:text-ivory active:scale-95"
                  }`}
                >
                  {buyingNow ? "Processing..." : "Buy Now"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- SEARCH BODY (used in global panel) ---------------- */
export function SearchBody({ onSelect }: { onSelect: (p: Product) => void }) {
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
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
    <div className="p-6 flex flex-col h-full">
      <div className={`flex items-center gap-3 border rounded-full px-4 py-3 bg-cream transition-all ${
        focused ? "border-clay ring-2 ring-clay/20" : "border-border"
      }`}>
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search ceramics, lighting, seating…"
          className="flex-1 bg-transparent outline-none text-sm"
        />
        {q && (
          <button
            onClick={() => setQ("")}
            className="text-muted-foreground hover:text-foreground transition text-sm"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <p className="mt-5 text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">
        {results.length} Result{results.length === 1 ? "" : "s"}
      </p>

      <ul className="mt-3 divide-y flex-1 overflow-y-auto">
        {results.map((p, idx) => (
          <li key={p.id} style={{ animationDelay: `${idx * 30}ms` }} className="slide-in-left">
            <button
              onClick={() => onSelect(p)}
              className="w-full flex gap-4 py-4 text-left hover:bg-sand/40 active:bg-sand rounded-lg px-2 transition-colors group"
            >
              <div className="relative flex-shrink-0 w-14 h-16 rounded-md overflow-hidden bg-sand">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                {p.stock === 0 && <div className="absolute inset-0 bg-bark/30" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-serif text-lg truncate group-hover:text-clay transition-colors">{p.name}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{p.category}</p>
                <p className="mt-1 text-sm font-medium">{inr(p.price)}</p>
              </div>
              {p.stock === 0 && <span className="text-[10px] text-clay uppercase font-medium">Sold out</span>}
            </button>
          </li>
        ))}
        {!results.length && (
          <li className="py-16 text-center text-sm text-muted-foreground">
            <p className="font-medium">No matches</p>
            <p className="text-xs mt-1">Try searching for "ceramics", "lighting", or a product name</p>
          </li>
        )}
      </ul>
    </div>
  );
}

/* ---------------- ACCOUNT BODY (used in global panel) ---------------- */
export function AccountBody({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!email.includes("@")) newErrors.email = "Valid email required";
    if (password.length < 4) newErrors.password = "Password must be at least 4 characters";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors below");
      return;
    }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setLoading(false);
    toast.success(`Welcome back, ${email.split("@")[0]}! 👋`);
    setEmail("");
    setPassword("");
    setErrors({});
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-5">
      <div className="w-16 h-16 mx-auto rounded-full bg-clay/15 text-clay grid place-items-center scale-pop">
        <User className="w-7 h-7" />
      </div>
      <div className="text-center">
        <h3 className="font-serif text-2xl">Welcome to Uchi</h3>
        <p className="text-sm text-muted-foreground mt-1">Sign in to track orders and save favourites.</p>
      </div>

      <label className="block">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Email</span>
        <div className={`mt-1 flex items-center gap-2 border rounded-full px-4 py-3 bg-cream transition-all ${
          errors.email ? "border-red-500 bg-red-50/30" : "border-border focus-within:ring-2 focus-within:ring-clay"
        }`}>
          <Mail className="w-4 h-4 text-muted-foreground" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: undefined }); }}
            placeholder="you@home.com"
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </label>

      <label className="block">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Password</span>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors({ ...errors, password: undefined }); }}
          placeholder="••••••••"
          className={`mt-1 w-full border rounded-full px-4 py-3 bg-cream outline-none text-sm transition-all ${
            errors.password ? "border-red-500 bg-red-50/30" : "border-border focus:ring-2 focus:ring-clay"
          }`}
        />
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
      </label>

      <button
        type="submit"
        disabled={loading}
        className={`w-full magnetic rounded-full py-3.5 font-medium inline-flex items-center justify-center gap-2 transition-all ${
          loading ? "bg-clay/60 text-ivory/70 btn-loading" : "bg-clay text-ivory hover:bg-clay-deep"
        } disabled:cursor-not-allowed`}
      >
        {loading ? "Signing in..." : <><LogIn className="w-4 h-4" /> Sign In</>}
      </button>

      <button
        type="button"
        disabled={loading}
        onClick={() => { if (!loading) toast("Account creation coming soon"); }}
        className="w-full rounded-full border border-bark text-bark py-3.5 font-medium hover:bg-bark hover:text-ivory transition disabled:opacity-50"
      >
        Create an Account
      </button>

      <p className="text-xs text-center text-muted-foreground">
        By continuing you agree to our terms and privacy policy.
      </p>
    </form>
  );
}
