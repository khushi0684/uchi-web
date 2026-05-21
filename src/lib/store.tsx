import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Product } from "@/components/uchi/data";

export type CartItem = { product: Product; qty: number };

type Store = {
  cart: CartItem[];
  wish: string[];
  cartOpen: boolean;
  wishOpen: boolean;
  searchOpen: boolean;
  accountOpen: boolean;
  modalProduct: Product | null;
  addToCart: (p: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  setCartQty: (id: string, q: number) => void;
  toggleWish: (id: string) => void;
  setCartOpen: (v: boolean) => void;
  setWishOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  setAccountOpen: (v: boolean) => void;
  setModalProduct: (p: Product | null) => void;
};

const Ctx = createContext<Store | null>(null);

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => loadJSON("uchi-cart", []));
  const [wish, setWish] = useState<string[]>(() => loadJSON("uchi-wish", []));
  const [cartOpen, setCartOpen] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  useEffect(() => { localStorage.setItem("uchi-cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("uchi-wish", JSON.stringify(wish)); }, [wish]);

  const addToCart = (p: Product, qty = 1) =>
    setCart((c) => {
      const idx = c.findIndex((x) => x.product.id === p.id);
      if (idx >= 0) { const copy = [...c]; copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty }; return copy; }
      return [...c, { product: p, qty }];
    });

  const removeFromCart = (id: string) => setCart((c) => c.filter((x) => x.product.id !== id));
  const setCartQty = (id: string, q: number) => setCart((c) => c.map((x) => (x.product.id === id ? { ...x, qty: q } : x)));
  const toggleWish = (id: string) => setWish((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));

  return (
    <Ctx.Provider value={{
      cart, wish, cartOpen, wishOpen, searchOpen, accountOpen, modalProduct,
      addToCart, removeFromCart, setCartQty, toggleWish,
      setCartOpen, setWishOpen, setSearchOpen, setAccountOpen, setModalProduct,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useStore(): Store {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
