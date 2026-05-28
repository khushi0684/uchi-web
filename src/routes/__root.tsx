import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";
import { StoreProvider, useStore } from "@/lib/store";
import { products } from "@/components/uchi/data";
import { SidePanel, CartBody, WishBody, SearchBody, AccountBody, ProductModal } from "@/components/uchi/Drawers";
import { toast } from "sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon.svg",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-JCPK7730BX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-JCPK7730BX');`,
          }}
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function GlobalUI() {
  const {
    cart, wish,
    cartOpen, wishOpen, searchOpen, accountOpen, modalProduct,
    addToCart, removeFromCart, setCartQty, toggleWish,
    setCartOpen, setWishOpen, setSearchOpen, setAccountOpen, setModalProduct,
  } = useStore();

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const wishedProducts = products.filter((p) => wish.includes(p.id));

  return (
    <>
      <SidePanel open={cartOpen} title={`Cart (${cartCount})`} onClose={() => setCartOpen(false)}>
        <CartBody
          items={cart}
          setQty={setCartQty}
          remove={removeFromCart}
          onCheckout={() => { setCartOpen(false); toast.success("Checkout opened — payment coming soon"); }}
        />
      </SidePanel>
      <SidePanel open={wishOpen} title="Wishlist" onClose={() => setWishOpen(false)}>
        <WishBody
          items={wishedProducts}
          remove={(id) => { toggleWish(id); toast("Removed from wishlist"); }}
          add={(p) => { addToCart(p); setWishOpen(false); toast.success(`${p.name} added to cart`); }}
        />
      </SidePanel>
      <SidePanel open={searchOpen} title="Search" onClose={() => setSearchOpen(false)}>
        <SearchBody onSelect={(p) => { setSearchOpen(false); setModalProduct(p); }} />
      </SidePanel>
      <SidePanel open={accountOpen} title="Account" onClose={() => setAccountOpen(false)}>
        <AccountBody onClose={() => setAccountOpen(false)} />
      </SidePanel>
      <ProductModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
        onAdd={(p, qty) => { addToCart(p, qty); toast.success(`${p.name} added to cart`); setCartOpen(true); }}
      />
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <Outlet />
        <GlobalUI />
        <Toaster />
      </StoreProvider>
    </QueryClientProvider>
  );
}
