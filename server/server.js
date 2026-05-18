import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// ── Mock Data ─────────────────────────────────────────────────────────────────
const products = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    price: 299.99,
    category: "Electronics",
    description:
      "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and studio-quality sound. Perfect for travel, work, and immersive listening sessions.",
    rating: 4.8,
    stock: 42,
    brand: "SoundCore",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 149.99,
    category: "Electronics",
    description:
      "Compact TKL mechanical keyboard with Cherry MX switches, per-key RGB backlight, and durable aluminum chassis. Tactile feedback for every keystroke.",
    rating: 4.6,
    stock: 18,
    brand: "KeyForge",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
  },
  {
    id: 3,
    name: "Minimalist Leather Wallet",
    price: 59.99,
    category: "Accessories",
    description:
      "Slim bifold wallet hand-crafted from full-grain Italian leather. Holds up to 8 cards and features RFID-blocking technology to keep your data safe.",
    rating: 4.5,
    stock: 75,
    brand: "CraftLeather",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400",
  },
  {
    id: 4,
    name: "Stainless Steel Water Bottle",
    price: 34.99,
    category: "Lifestyle",
    description:
      "Double-wall vacuum insulated bottle keeps drinks cold for 24 hours and hot for 12. BPA-free, leak-proof lid and durable powder-coat finish.",
    rating: 4.7,
    stock: 120,
    brand: "HydroFlow",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
  },
  {
    id: 5,
    name: "Yoga Mat Premium",
    price: 79.99,
    category: "Fitness",
    description:
      "Eco-friendly natural rubber yoga mat with alignment lines, 6mm cushioning, and non-slip surface. Includes carrying strap. Great for all skill levels.",
    rating: 4.4,
    stock: 55,
    brand: "ZenFlex",
    image: "https://images.unsplash.com/photo-1601925228246-91a04e08aa65?w=400",
  },
  {
    id: 6,
    name: "Ceramic Pour-Over Coffee Set",
    price: 89.99,
    category: "Kitchen",
    description:
      "Hand-thrown ceramic dripper, carafe, and two mugs for the ritual of pour-over coffee. Food-safe glaze, dishwasher-safe, and stunning on any countertop.",
    rating: 4.9,
    stock: 30,
    brand: "BrewCraft",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
  },
  {
    id: 7,
    name: "Portable Bluetooth Speaker",
    price: 119.99,
    category: "Electronics",
    description:
      "360° surround sound in a waterproof, dustproof body. 20-hour playtime, built-in microphone, and True Wireless Stereo pairing with a second unit.",
    rating: 4.5,
    stock: 38,
    brand: "SoundCore",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
  },
  {
    id: 8,
    name: "Merino Wool Beanie",
    price: 44.99,
    category: "Accessories",
    description:
      "Soft, itch-free 100% merino wool beanie. Naturally temperature-regulating and moisture-wicking. One size fits most, available in 8 earth-tone colors.",
    rating: 4.6,
    stock: 90,
    brand: "WoolCo",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400",
  },
];

// ── Routes ────────────────────────────────────────────────────────────────────
// GET all products
app.get("/api/products", (req, res) => {
  const { category, search } = req.query;
  let result = [...products];

  if (category && category !== "All") {
    result = result.filter((p) => p.category === category);
  }
  if (search) {
    result = result.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json({ success: true, count: result.length, products: result });
});

// GET single product
app.get("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  // Related products (same category, excluding self)
  const related = products
    .filter((p) => p.category === product.category && p.id !== id)
    .slice(0, 3);

  res.json({ success: true, product, related });
});

// ── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Express server running at http://localhost:${PORT}`);
  console.log(`   GET http://localhost:${PORT}/api/products`);
  console.log(`   GET http://localhost:${PORT}/api/products/:id`);
});
