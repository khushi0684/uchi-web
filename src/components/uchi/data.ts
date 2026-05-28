import bowl from "@/assets/product-bowl.jpg";
import vase from "@/assets/product-vase.jpg";
import cabinet from "@/assets/product-cabinet.jpg";
import lamp from "@/assets/product-lamp.jpg";
import table from "@/assets/product-table.jpg";
import chair from "@/assets/product-chair.jpg";
import floorlamp from "@/assets/product-floorlamp.jpg";
import sofa from "@/assets/product-sofa.jpg";
import metalSideTable from "@/assets/product-metal-side-table.jpg";
import bedsideTable from "@/assets/product-bedside-table.jpg";

export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  /** Original list price (for showing a discount). Optional. */
  compareAtPrice?: number;
  category: string;
  rating: number;
  reviewCount: number;
  image: string;
  /** Extra gallery shots — falls back to [image] when empty. */
  gallery?: string[];
  description: string;
  /** Longer-form copy for the product detail page. */
  longDescription?: string;
  specs?: { label: string; value: string }[];
  /** Units in stock. 0 = sold out. */
  stock: number;
  reviews?: Review[];
};

export const products: Product[] = [
  {
    id: "cabinet",
    name: "Hinoki Cabinet",
    price: 24999,
    compareAtPrice: 28999,
    category: "Storage",
    rating: 4.9,
    reviewCount: 124,
    image: cabinet,
    gallery: [cabinet, table, sofa],
    description:
      "Hand-woven rattan doors set into solid oak. Quiet joinery, no visible hardware.",
    longDescription:
      "The Hinoki Cabinet pairs solid white oak with hand-woven rattan door panels. Every joint is hand-cut, glued, and dowelled — no metal fasteners, no visible hardware. Soft-close hinges and adjustable interior shelves make it as functional as it is quiet.",
    specs: [
      { label: "Materials", value: "Solid white oak, woven rattan" },
      { label: "Dimensions", value: "120 × 45 × 90 cm" },
      { label: "Finish", value: "Hardwax oil, food-safe" },
      { label: "Origin", value: "Made in Jaipur, India" },
    ],
    stock: 6,
  },
  {
    id: "lamp",
    name: "Asagao Pendant",
    price: 4999,
    category: "Lighting",
    rating: 4.8,
    reviewCount: 87,
    image: lamp,
    gallery: [lamp, floorlamp],
    description:
      "Wide woven shade that pools warm light across a table at golden hour.",
    longDescription:
      "Inspired by the morning glory flower, the Asagao Pendant casts a wide circle of warm light. The shade is hand-woven over a steel frame and finished with an undyed cotton cord.",
    specs: [
      { label: "Materials", value: "Woven rattan, steel, cotton cord" },
      { label: "Dimensions", value: "Ø 55 × 28 cm" },
      { label: "Bulb", value: "E27, 8W LED recommended" },
      { label: "Cord length", value: "2.5 m" },
    ],
    stock: 14,
  },
  {
    id: "table",
    name: "Nara Dining Table",
    price: 18999,
    compareAtPrice: 21999,
    category: "Tables",
    rating: 4.9,
    reviewCount: 56,
    image: table,
    gallery: [table, chair, cabinet],
    description: "Walnut top, splayed legs, six seats. Built for long, slow dinners.",
    longDescription:
      "A six-seater dining table cut from a single walnut slab and supported by splayed solid-oak legs. Finished in a matte hardwax oil that develops a soft patina over years of use.",
    specs: [
      { label: "Materials", value: "Solid walnut, oak base" },
      { label: "Dimensions", value: "200 × 90 × 75 cm" },
      { label: "Seats", value: "6 comfortably" },
      { label: "Finish", value: "Hardwax oil" },
    ],
    stock: 3,
  },
  {
    id: "chair",
    name: "Tori Lounge Chair",
    price: 7499,
    category: "Seating",
    rating: 4.7,
    reviewCount: 142,
    image: chair,
    gallery: [chair, sofa, table],
    description: "Sculptural bent-ply frame, hand-stitched bouclé seat.",
    longDescription:
      "The Tori Lounge Chair has a steam-bent plywood frame and a deep, hand-stitched bouclé seat. Made for slow afternoons with a book.",
    specs: [
      { label: "Materials", value: "Bent ply, undyed bouclé" },
      { label: "Dimensions", value: "70 × 80 × 75 cm" },
      { label: "Seat height", value: "42 cm" },
    ],
    stock: 9,
  },
  {
    id: "bowl",
    name: "Suna Stoneware Bowl",
    price: 1899,
    category: "Ceramics",
    rating: 4.9,
    reviewCount: 312,
    image: bowl,
    gallery: [bowl, vase],
    description: "Speckled stoneware glaze, fired in a wood kiln in Tokoname.",
    longDescription:
      "Wheel-thrown stoneware with a speckled ash glaze. Each bowl is fired in a traditional wood kiln in Tokoname, so no two are exactly alike.",
    specs: [
      { label: "Materials", value: "Stoneware, ash glaze" },
      { label: "Dimensions", value: "Ø 18 × 8 cm" },
      { label: "Care", value: "Dishwasher safe" },
    ],
    stock: 42,
  },
  {
    id: "vase",
    name: "Kawa Vessel",
    price: 3499,
    compareAtPrice: 3999,
    category: "Ceramics",
    rating: 4.8,
    reviewCount: 98,
    image: vase,
    gallery: [vase, bowl],
    description: "Two-tone vessel: matte cream meets raw clay foot.",
    longDescription:
      "A hand-thrown vessel finished half in matte cream glaze, half in raw, unglazed clay. Perfect for dried branches or as a quiet object on its own.",
    specs: [
      { label: "Materials", value: "Stoneware" },
      { label: "Dimensions", value: "Ø 16 × 24 cm" },
      { label: "Watertight", value: "Yes" },
    ],
    stock: 0,
  },
  {
    id: "floorlamp",
    name: "Tsuki Lantern",
    price: 8999,
    category: "Lighting",
    rating: 4.9,
    reviewCount: 64,
    image: floorlamp,
    gallery: [floorlamp, lamp],
    description: "Mulberry-paper sphere on a turned ash base.",
    longDescription:
      "A hand-pressed mulberry-paper sphere on a turned solid-ash base. The light is diffused, warm, and shadow-free.",
    specs: [
      { label: "Materials", value: "Mulberry paper, solid ash" },
      { label: "Dimensions", value: "Ø 45 × 145 cm" },
      { label: "Bulb", value: "E27, 8W LED recommended" },
    ],
    stock: 7,
  },
  {
    id: "bedside-table",
    name: "Uchi Modern Bedside Table with Open Shelf & Drawer",
    price: 5000,
    compareAtPrice: 6999,
    category: "Storage",
    rating: 4.9,
    reviewCount: 0,
    image: bedsideTable,
    gallery: [bedsideTable],
    description:
      "Bring clean modern aesthetics to your space with this elegant bedside table finished in a soft off-white tone. Designed with an open storage shelf and concealed drawer space.",
    longDescription:
      "Bring clean modern aesthetics to your space with this elegant bedside table finished in a soft off-white tone. Designed with an open storage shelf and concealed drawer space, it offers the perfect balance of style and functionality for everyday essentials. A versatile nightstand that fits beautifully in both bedrooms and living rooms.",
    specs: [
      { label: "Material", value: "Engineering Wood" },
      { label: "Dimensions", value: "40 × 40 × 50 cm" },
      { label: "Finish", value: "Laminated, Food Safe" },
      { label: "Origin", value: "Made in Odisha, India" },
    ],
    stock: 10,
  },
  {
    id: "metal-side-table",
    name: "Metal Side Table with Shelf — 22 inch",
    price: 4500,
    compareAtPrice: 6500,
    category: "Tables",
    rating: 4.9,
    reviewCount: 0,
    image: metalSideTable,
    gallery: [metalSideTable],
    description:
      "A sleek modern metal side table with an open geometric design, blending minimalist aesthetics with practical storage for books and décor.",
    longDescription:
      "A sleek modern metal side table with an open geometric design, blending minimalist aesthetics with practical storage for books and décor. The open shelves keep your favourite reads and objects within easy reach, while the powder-coated finish adds a durable, matte elegance that fits any interior.",
    specs: [
      { label: "Material", value: "Heavy Metal" },
      { label: "Dimensions", value: "54.5 × 35 × 35 cm" },
      { label: "Finish", value: "Powder Coated, Food Safe" },
      { label: "Origin", value: "Made in Odisha, India" },
    ],
    stock: 10,
  },
  {
    id: "sofa",
    name: "Awa Three-Seater",
    price: 64999,
    compareAtPrice: 72999,
    category: "Seating",
    rating: 4.9,
    reviewCount: 38,
    image: sofa,
    gallery: [sofa, chair, table],
    description: "Down-feather cushions wrapped in undyed bouclé.",
    longDescription:
      "A generous three-seater with deep down-feather cushions, a solid kiln-dried hardwood frame, and an undyed bouclé cover. Made to be lived on for decades.",
    specs: [
      { label: "Materials", value: "Hardwood frame, down feather, bouclé" },
      { label: "Dimensions", value: "220 × 95 × 80 cm" },
      { label: "Cover", value: "Removable, dry-clean only" },
    ],
    stock: 2,
  },
];

const sharedReviews: Review[] = [
  {
    id: "r1",
    author: "Ananya R.",
    rating: 5,
    date: "March 2026",
    title: "Quietly beautiful",
    body: "Arrived perfectly packed. The finish is even better in person — it's become the calmest corner of our home.",
  },
  {
    id: "r2",
    author: "Vikram S.",
    rating: 5,
    date: "February 2026",
    title: "Worth every rupee",
    body: "The craftsmanship is exceptional. You can feel that it's made to last a lifetime.",
  },
  {
    id: "r3",
    author: "Meera J.",
    rating: 4,
    date: "January 2026",
    title: "Lovely, with one note",
    body: "Beautiful piece. Delivery took a little longer than expected, but the studio kept me updated throughout.",
  },
];

// Attach the shared reviews list to every product that doesn't already have one.
for (const p of products) {
  if (!p.reviews) p.reviews = sharedReviews;
}

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

export const getRelatedProducts = (id: string, limit = 4): Product[] => {
  const current = getProductById(id);
  if (!current) return [];
  const sameCategory = products.filter(
    (p) => p.id !== id && p.category === current.category
  );
  const others = products.filter(
    (p) => p.id !== id && p.category !== current.category
  );
  return [...sameCategory, ...others].slice(0, limit);
};
