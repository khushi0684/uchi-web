import bowl from "@/assets/product-bowl.jpg";
import vase from "@/assets/product-vase.jpg";
import cabinet from "@/assets/product-cabinet.jpg";
import lamp from "@/assets/product-lamp.jpg";
import table from "@/assets/product-table.jpg";
import chair from "@/assets/product-chair.jpg";
import floorlamp from "@/assets/product-floorlamp.jpg";
import sofa from "@/assets/product-sofa.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  description: string;
};

export const products: Product[] = [
  { id: "cabinet", name: "Hinoki Cabinet", price: 24999, category: "Storage", rating: 4.9, image: cabinet,
    description: "Hand-woven rattan doors set into solid oak. Quiet joinery, no visible hardware." },
  { id: "lamp", name: "Asagao Pendant", price: 4999, category: "Lighting", rating: 4.8, image: lamp,
    description: "Wide woven shade that pools warm light across a table at golden hour." },
  { id: "table", name: "Nara Dining Table", price: 18999, category: "Tables", rating: 4.9, image: table,
    description: "Walnut top, splayed legs, six seats. Built for long, slow dinners." },
  { id: "chair", name: "Tori Lounge Chair", price: 7499, category: "Seating", rating: 4.7, image: chair,
    description: "Sculptural bent-ply frame, hand-stitched bouclé seat." },
  { id: "bowl", name: "Suna Stoneware Bowl", price: 1899, category: "Ceramics", rating: 4.9, image: bowl,
    description: "Speckled stoneware glaze, fired in a wood kiln in Tokoname." },
  { id: "vase", name: "Kawa Vessel", price: 3499, category: "Ceramics", rating: 4.8, image: vase,
    description: "Two-tone vessel: matte cream meets raw clay foot." },
  { id: "floorlamp", name: "Tsuki Lantern", price: 8999, category: "Lighting", rating: 4.9, image: floorlamp,
    description: "Mulberry-paper sphere on a turned ash base." },
  { id: "sofa", name: "Awa Three-Seater", price: 64999, category: "Seating", rating: 4.9, image: sofa,
    description: "Down-feather cushions wrapped in undyed bouclé." },
];

export const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN");
