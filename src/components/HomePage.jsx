import { Link } from "react-router-dom";
import "./HomePage.css";

const features = [
  { icon: "🚚", title: "Free Shipping", desc: "On all orders over $50" },
  { icon: "↩️", title: "Easy Returns", desc: "30-day hassle-free returns" },
  { icon: "🔒", title: "Secure Payments", desc: "256-bit SSL encryption" },
  { icon: "💬", title: "24/7 Support", desc: "We're always here to help" },
];

const categories = [
  { label: "Electronics", emoji: "💻", count: 3 },
  { label: "Accessories", emoji: "👜", count: 2 },
  { label: "Lifestyle", emoji: "🌿", count: 1 },
  { label: "Fitness", emoji: "🏋️", count: 1 },
  { label: "Kitchen", emoji: "☕", count: 1 },
];

function HomePage() {
  return (
    <div className="home-page">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-text">
          <p className="hero-eyebrow">New Arrivals 2025</p>
          <h1 className="hero-title">
            Discover <span className="hero-accent">Curated</span>
            <br />
            Products for
            <br />
            Modern Living
          </h1>
          <p className="hero-desc">
            Hand-picked items across electronics, lifestyle, fitness and more —
            designed to elevate your everyday.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn-primary">
              Shop Now →
            </Link>
            <a href="#features" className="btn-secondary">
              Learn More
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-blob" />
          <div className="hero-card-stack">
            <div className="floating-card card-1">
              <span>💻</span>
              <p>Electronics</p>
            </div>
            <div className="floating-card card-2">
              <span>🎧</span>
              <p>Audio</p>
            </div>
            <div className="floating-card card-3">
              <span>☕</span>
              <p>Kitchen</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────── */}
      <section className="categories-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link
              to={`/products?category=${cat.label}`}
              key={cat.label}
              className="category-chip"
            >
              <span className="chip-emoji">{cat.emoji}</span>
              <span className="chip-label">{cat.label}</span>
              <span className="chip-count">{cat.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="features-section" id="features">
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <span className="feature-icon">{f.icon}</span>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────── */}
      <section className="cta-banner">
        <h2>Ready to explore?</h2>
        <p>8 hand-picked products waiting for you.</p>
        <Link to="/products" className="btn-primary">
          Browse All Products
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
