import { Link } from "@tanstack/react-router";
import { Eye, Heart, Plus, Star } from "lucide-react";
import { inr, type Product } from "./data";

export function ProductCard({
  product,
  wished,
  onAdd,
  onWish,
  onOpen,
}: {
  product: Product;
  wished: boolean;
  onAdd: (p: Product) => void;
  onWish: (id: string) => void;
  onOpen?: (p: Product) => void;
}) {
  const isSoldOut = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 3;

  return (
    <div className="group lift relative rounded-2xl overflow-hidden bg-card border border-border/60">
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        onClick={(e) => {
          if (onOpen) { e.preventDefault(); onOpen(product); }
        }}
        className="block w-full text-left aspect-[4/5] overflow-hidden bg-sand relative"
        aria-label={`View ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={1000}
          className="img-zoom w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bark/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <span className="absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase bg-ivory/85 backdrop-blur px-2.5 py-1 rounded-full">
          {product.category}
        </span>
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1 bg-ivory/85 backdrop-blur px-2.5 py-1 rounded-full text-xs">
          <Star className="w-3 h-3 fill-clay text-clay" />
          {product.rating}
        </span>

        {isLowStock && (
          <span className="absolute bottom-4 right-4 bg-clay/90 backdrop-blur text-ivory text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wide font-medium">
            Only {product.stock} left
          </span>
        )}

        {isSoldOut && (
          <div className="absolute inset-0 bg-bark/40 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-ivory/90 text-bark text-[11px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full font-medium">
              Sold Out
            </span>
          </div>
        )}

        {onOpen && !isSoldOut && (
          <span className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <span className="inline-flex items-center gap-1.5 bg-ivory/90 backdrop-blur text-bark text-[11px] tracking-wide px-4 py-2 rounded-full">
              <Eye className="w-3.5 h-3.5" /> Quick View
            </span>
          </span>
        )}
      </Link>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onWish(product.id);
        }}
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        className={`absolute top-4 right-4 w-9 h-9 rounded-full grid place-items-center backdrop-blur transition
          ${wished ? "bg-clay text-ivory" : "bg-ivory/85 text-bark hover:bg-clay hover:text-ivory"}`}
      >
        <Heart className="w-4 h-4" fill={wished ? "currentColor" : "none"} />
      </button>

      <div className="p-5 flex items-center justify-between gap-4">
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          onClick={(e) => {
            if (onOpen) { e.preventDefault(); onOpen(product); }
          }}
          className="min-w-0 group/title flex-1"
        >
          <h3 className="font-serif text-lg group-hover/title:text-clay transition-colors duration-300">
            {product.name}
          </h3>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-sm font-medium">
              {product.compareAtPrice && product.compareAtPrice > product.price ? (
                <span className="text-foreground">{inr(product.price)}</span>
              ) : (
                inr(product.price)
              )}
            </p>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <p className="text-xs text-muted-foreground line-through">{inr(product.compareAtPrice)}</p>
            )}
          </div>
        </Link>
        <button
          onClick={() => { if (!isSoldOut) onAdd(product); }}
          disabled={isSoldOut}
          aria-label={`Add ${product.name} to cart`}
          className={`magnetic shrink-0 w-11 h-11 rounded-full grid place-items-center transition-all duration-300 active:scale-95 ${
            isSoldOut
              ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
              : "bg-bark text-ivory hover:bg-clay hover:shadow-md"
          }`}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
