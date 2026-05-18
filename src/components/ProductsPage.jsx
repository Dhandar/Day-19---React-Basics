import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./ProductsPage.css";

const CATEGORIES = ["All", "Electronics", "Accessories", "Lifestyle", "Fitness", "Kitchen"];

function StarRating({ rating }) {
  return (
    <span className="star-rating" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= Math.round(rating) ? "star filled" : "star"}>
          ★
        </span>
      ))}
      <span className="rating-num">{rating}</span>
    </span>
  );
}

function ProductCard({ product, onClick }) {
  return (
    <article className="product-card" onClick={() => onClick(product.id)}>
      <div className="card-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="card-image"
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://placehold.co/400x280/1a1a2e/ffffff?text=${encodeURIComponent(product.name)}`;
          }}
        />
        <span className="card-category-badge">{product.category}</span>
      </div>
      <div className="card-body">
        <h3 className="card-name">{product.name}</h3>
        <StarRating rating={product.rating} />
        <div className="card-footer">
          <span className="card-price">${product.price.toFixed(2)}</span>
          <button className="card-btn" aria-label="View details">
            View →
          </button>
        </div>
      </div>
    </article>
  );
}

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Respect ?category= from URL (e.g. from HomePage chips)
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && CATEGORIES.includes(cat)) setActiveCategory(cat);
  }, [searchParams]);

  // ── Fetch products ────────────────────────────────────────────────────────
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (activeCategory !== "All") params.category = activeCategory;
      if (search.trim()) params.search = search.trim();

      const { data } = await axios.get("/api/products", { params });
      setProducts(data.products);
    } catch (err) {
      console.error(err);
      setError("Failed to load. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleCardClick = (id) => navigate(`/products/${id}`);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="products-page">
      <div className="products-header">
        <div>
          <h1 className="products-title">Our Products</h1>
          <p className="products-subtitle">
            {loading ? "Loading…" : `${products.length} item${products.length !== 1 ? "s" : ""} found`}
          </p>
        </div>

        {/* Search */}
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="search-btn">🔍</button>
        </form>
      </div>

      {/* Category Filters */}
      <div className="filter-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── States ── */}
      {loading && (
        <div className="state-container">
          <div className="spinner" />
          <p className="state-text">Loading products…</p>
        </div>
      )}

      {!loading && error && (
        <div className="state-container error-state">
          <span className="state-icon">⚠️</span>
          <p className="state-text">{error}</p>
          <button className="retry-btn" onClick={fetchProducts}>
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="state-container">
          <span className="state-icon">🔍</span>
          <p className="state-text">No products match your search.</p>
          <button
            className="retry-btn"
            onClick={() => {
              setSearch("");
              setActiveCategory("All");
            }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* ── Product Grid ── */}
      {!loading && !error && products.length > 0 && (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={handleCardClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
