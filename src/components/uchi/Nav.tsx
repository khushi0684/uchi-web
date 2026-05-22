import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Collections", to: "/products" },
  { label: "Journal", to: "/journal" },
  { label: "Contact", to: "/contact" },
];

export function Nav({ cartCount, wishCount, onCartClick, onWishClick, onSearchClick, onAccountClick }: {
  cartCount: number;
  wishCount: number;
  onCartClick: () => void;
  onWishClick: () => void;
  onSearchClick: () => void;
  onAccountClick: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-ivory/70 border-b border-border/60 text-foreground"
          : isHome
            ? "bg-transparent text-ivory"
            : "bg-transparent text-foreground"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-serif text-2xl tracking-tight">
          <span className="inline-block w-7 h-7 rounded-sm border-2 border-current relative">
            <span className="absolute inset-x-1 top-1 h-1 bg-current rounded-sm" />
          </span>
          <span className="italic">uchi</span>
        </a>

        <nav className="hidden lg:flex items-center gap-10 text-sm">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="relative group/link tracking-wide"
              activeProps={{ className: "font-medium" }}
            >
              {l.label}
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-current transition-all duration-500 group-hover/link:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button aria-label="Search" onClick={onSearchClick} className="p-2.5 rounded-full hover:bg-current/10 transition">
            <Search className="w-[18px] h-[18px]" />
          </button>
          <button aria-label="Wishlist" onClick={onWishClick} className="relative p-2.5 rounded-full hover:bg-current/10 transition">
            <Heart className="w-[18px] h-[18px]" />
            {wishCount > 0 && <Badge n={wishCount} />}
          </button>
          <button aria-label="Account" onClick={onAccountClick} className="p-2.5 rounded-full hover:bg-current/10 transition">
            <User className="w-[18px] h-[18px]" />
          </button>
          <button aria-label="Cart" onClick={onCartClick} className="relative p-2.5 rounded-full hover:bg-current/10 transition">
            <ShoppingBag className="w-[18px] h-[18px]" />
            {cartCount > 0 && <Badge n={cartCount} />}
          </button>

          <Link
            to="/products"
            className="hidden md:inline-flex magnetic ml-3 items-center gap-2 rounded-full bg-ivory text-bark px-5 py-2.5 text-sm font-medium shadow-soft"
          >
            Shop Now
            <span className="inline-block w-6 h-6 rounded-full bg-clay text-ivory grid place-items-center text-[11px]">→</span>
          </Link>

          <button onClick={() => setOpen(true)} className="lg:hidden p-2.5 rounded-full hover:bg-current/10">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-ivory text-bark z-50 animate-in fade-in duration-300">
          <div className="flex items-center justify-between px-6 h-20 border-b">
            <span className="font-serif text-2xl italic">uchi</span>
            <button onClick={() => setOpen(false)} className="p-2.5">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-10 gap-6 font-serif text-4xl">
            {links.map((l) => (
              <Link key={l.label} to={l.to} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Badge({ n }: { n: number }) {
  return (
    <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-clay text-ivory text-[10px] font-semibold grid place-items-center">
      {n}
    </span>
  );
}
