import { Minus, Plus, Trash2, X } from "lucide-react";
import { inr, type Product } from "./data";

export type CartItem = { product: Product; qty: number };

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
  if (!items.length) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        <p className="font-serif text-2xl text-foreground">Your cart is quiet.</p>
        <p className="mt-2 text-sm">Add a piece you'll keep for years.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full">
      <ul className="flex-1 divide-y">
        {items.map(({ product, qty }) => (
          <li key={product.id} className="p-6 flex gap-4">
            <img src={product.image} alt={product.name} className="w-20 h-24 object-cover rounded-lg" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between gap-3">
                <h4 className="font-serif text-lg leading-tight">{product.name}</h4>
                <button onClick={() => remove(product.id)} className="text-muted-foreground hover:text-clay">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{product.category}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="inline-flex items-center border rounded-full">
                  <button onClick={() => setQty(product.id, Math.max(1, qty - 1))} className="p-2"><Minus className="w-3.5 h-3.5" /></button>
                  <span className="w-6 text-center text-sm">{qty}</span>
                  <button onClick={() => setQty(product.id, qty + 1)} className="p-2"><Plus className="w-3.5 h-3.5" /></button>
                </div>
                <span className="font-medium">{inr(product.price * qty)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="border-t p-6 space-y-4 bg-cream">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Subtotal</span><span>{inr(total)}</span>
        </div>
        <div className="flex justify-between font-serif text-2xl">
          <span>Total</span><span>{inr(total)}</span>
        </div>
        <button onClick={onCheckout} className="w-full magnetic rounded-full bg-clay text-ivory py-4 font-medium tracking-wide">
          Proceed to Checkout
        </button>
        <p className="text-xs text-center text-muted-foreground">Complimentary shipping within India.</p>
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
      <div className="p-10 text-center text-muted-foreground">
        <p className="font-serif text-2xl text-foreground">No favourites yet.</p>
        <p className="mt-2 text-sm">Tap the heart on any piece.</p>
      </div>
    );
  }
  return (
    <ul className="divide-y">
      {items.map((p) => (
        <li key={p.id} className="p-6 flex gap-4">
          <img src={p.image} alt={p.name} className="w-20 h-24 object-cover rounded-lg" />
          <div className="flex-1">
            <h4 className="font-serif text-lg">{p.name}</h4>
            <p className="text-sm text-muted-foreground">{inr(p.price)}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={() => add(p)} className="rounded-full bg-bark text-ivory text-xs px-3 py-1.5 magnetic">Add to Cart</button>
              <button onClick={() => remove(p.id)} className="rounded-full border text-xs px-3 py-1.5">Remove</button>
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
  if (!product) return null;
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-4 sm:p-8" role="dialog">
      <div className="absolute inset-0 bg-bark/50 backdrop-blur-md animate-in fade-in" onClick={onClose} />
      <div className="relative w-full max-w-5xl bg-ivory rounded-3xl overflow-hidden grid md:grid-cols-2 shadow-lift animate-in zoom-in-95 fade-in duration-500">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-ivory/90 grid place-items-center">
          <X className="w-5 h-5" />
        </button>
        <div className="aspect-square md:aspect-auto bg-sand overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-8 md:p-12 flex flex-col">
          <span className="text-[10px] tracking-[0.3em] uppercase text-clay">{product.category}</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-3 leading-tight">{product.name}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">{product.description}</p>
          <p className="mt-6 font-serif text-3xl">{inr(product.price)}</p>
          <div className="mt-auto pt-8 flex gap-3">
            <button
              onClick={() => { onAdd(product, 1); onClose(); }}
              className="flex-1 magnetic rounded-full bg-clay text-ivory py-4 font-medium"
            >
              Add to Cart
            </button>
            <button
              onClick={() => { onAdd(product, 1); onClose(); }}
              className="flex-1 rounded-full border border-bark text-bark py-4 font-medium hover:bg-bark hover:text-ivory transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
