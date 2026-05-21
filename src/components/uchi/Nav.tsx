import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Heart, Menu, Moon, Search, ShoppingBag, Sun, User, X } from "lucide-react";
import { useStore } from "@/lib/store";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Collections", to: "/collections" },
  { label: "Journal", to: "/journal" },
  { label: "Contact", to: "/contact" },
];

export function Nav() {
  const { cart, wish, setCartOpen, setWishOpen, setSearchOpen, setAccountOpen } = useStore();
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const wishCount = wish.length;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("uchi-theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("uchi-theme", dark ? "dark" : "light");
  }, [dark]);

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
        <a href="#top" className="flex items-center gap-1 leading-none">
          <LogoMark className="h-10 w-auto" />
          <span className="text-[1.35rem] font-light tracking-wide -ml-0.5">chi</span>
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
          <button aria-label="Search" onClick={() => setSearchOpen(true)} className="p-2.5 rounded-full hover:bg-current/10 transition">
            <Search className="w-[18px] h-[18px]" />
          </button>
          <button
            aria-label="Toggle dark mode"
            onClick={() => setDark((d) => !d)}
            className="p-2.5 rounded-full hover:bg-current/10 transition"
          >
            {dark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>
          <button aria-label="Wishlist" onClick={() => setWishOpen(true)} className="relative p-2.5 rounded-full hover:bg-current/10 transition">
            <Heart className="w-[18px] h-[18px]" />
            {wishCount > 0 && <Badge n={wishCount} />}
          </button>
          <button aria-label="Account" onClick={() => setAccountOpen(true)} className="p-2.5 rounded-full hover:bg-current/10 transition">
            <User className="w-[18px] h-[18px]" />
          </button>
          <button aria-label="Cart" onClick={() => setCartOpen(true)} className="relative p-2.5 rounded-full hover:bg-current/10 transition">
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
        <>
          <div
            className="fixed inset-0 bg-bark/40 backdrop-blur-sm z-40 animate-in fade-in duration-300"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-0 bg-ivory text-bark z-50 flex flex-col animate-in fade-in duration-300 overflow-y-auto">
            <div className="flex items-center justify-between px-6 h-20 border-b flex-shrink-0">
              <div className="flex items-center gap-1 leading-none text-bark">
                <LogoMark className="h-10 w-auto" />
                <span className="text-[1.35rem] font-light tracking-wide -ml-0.5">chi</span>
              </div>
              <button onClick={() => setOpen(false)} className="p-2.5 hover:bg-sand rounded-full transition">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col px-6 py-10 gap-8 font-serif text-4xl">
              {links.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="hover:text-clay transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
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

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 56 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="27" y1="2" x2="27" y2="11" />
      <polyline points="27,13 6,35 8,41" />
      <polyline points="27,13 50,35 48,41" />
      <path d="M 12 35 L 12 52 Q 12 60 22 60 L 34 60 Q 44 60 44 52 L 44 35" />
    </svg>
  );
}
