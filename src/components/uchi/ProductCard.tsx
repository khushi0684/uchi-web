import { Link } from "@tanstack/react-router";
import { Heart, Plus, Star } from "lucide-react";
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
  /** Optional — when provided, the card image becomes a quick-view trigger via the secondary button. */
  onOpen?: (p: Product) => void;
}) {
  return (
    <div className="group lift relative rounded-2xl overflow-hidden bg-card border border-border/60">
      <Link
        to="/product/$id"
        params={{ id: product.id }}
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
            // Allow optional quick-view via parent; default = navigate.
            if (onOpen) {
              e.preventDefault();
              onOpen(product);
            }
          }}
          className="min-w-0 group/title"
        >
          <h3 className="font-serif text-xl truncate group-hover/title:text-clay transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            {product.compareAtPrice && product.compareAtPrice > product.price ? (
              <>
                <span className="text-foreground">{inr(product.price)}</span>{" "}
                <span className="line-through">{inr(product.compareAtPrice)}</span>
              </>
            ) : (
              inr(product.price)
            )}
          </p>
        </Link>
        <button
          onClick={() => onAdd(product)}
          aria-label={`Add ${product.name} to cart`}
          className="magnetic shrink-0 w-11 h-11 rounded-full bg-bark text-ivory grid place-items-center hover:bg-clay transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
