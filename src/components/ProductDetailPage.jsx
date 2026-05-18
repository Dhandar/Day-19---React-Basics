import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./ProductDetailPage.css";

function StarRating({ rating }) {
  return (
    <span className="detail-stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= Math.round(rating) ? "star filled" : "star"}>
          ★
        </span>
      ))}
      <span className="rating-label">{rating} / 5</span>
    </span>
  );
}

function RelatedCard({ product }) {
  const navigate = useNavigate();
  return (
    <div className="related-card" onClick={() => navigate(`/products/${product.id}`)}>
      <img
        src={product.image}
        alt={product.name}
        className="related-img"
        onError={(e) => {
          e.target.src = `https://placehold.co/200x140/1a1a2e/ffffff?text=Product`;
        }}
      />
      <div className="related-info">
        <p className="related-name">{product.name}</p>
        <p className="related-price">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}

function ProductDetailPage() {
  const { id } = useParams();          // ← useParams() to extract :id
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // ── Fetch product by id ───────────────────────────────────────────────────
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      setProduct(null);
      setRelated([]);
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data.product);
        setRelated(data.related || []);
      } catch (err) {
        if (err.response?.status === 404) {
          setError("Product not found.");
        } else {
          setError("Failed to load. Try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);   // re-run whenever the :id param changes

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // ── Loading ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="detail-page">
        <div className="state-container">
          <div className="spinner" />
          <p className="state-text">Loading product…</p>
        </div>
      </div>
    );
  }

  // ── Error ─────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="detail-page">
        <div className="state-container error-state">
          <span className="state-icon">⚠️</span>
          <p className="state-text">{error}</p>
          <div className="error-actions">
            <button className="retry-btn" onClick={() => window.location.reload()}>
              Try Again
            </button>
            <Link to="/products" className="back-link">
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Product Detail ────────────────────────────────────────────────────────
  return (
    <div className="detail-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span> / </span>
        <Link to="/products">Products</Link>
        <span> / </span>
        <span className="breadcrumb-current">{product.name}</span>
      </nav>

      <div className="detail-grid">
        {/* ── Image Panel ── */}
        <div className="detail-image-panel">
          <img
            src={product.image}
            alt={product.name}
            className="detail-image"
            onError={(e) => {
              e.target.src = `https://placehold.co/600x420/1a1a2e/ffffff?text=${encodeURIComponent(product.name)}`;
            }}
          />
          <span className="detail-category-badge">{product.category}</span>
        </div>

        {/* ── Info Panel ── */}
        <div className="detail-info-panel">
          <p className="detail-brand">{product.brand}</p>
          <h1 className="detail-name">{product.name}</h1>

          <StarRating rating={product.rating} />

          <p className="detail-price">${product.price.toFixed(2)}</p>

          <p className="detail-description">{product.description}</p>

          {/* Stock Indicator */}
          <div className="detail-stock">
            <span
              className={`stock-dot ${product.stock > 20 ? "in-stock" : product.stock > 0 ? "low-stock" : "out-stock"}`}
            />
            {product.stock > 20
              ? `In Stock (${product.stock} available)`
              : product.stock > 0
              ? `Low Stock — only ${product.stock} left!`
              : "Out of Stock"}
          </div>

          {/* Quantity + Add to Cart */}
          {product.stock > 0 && (
            <div className="detail-actions">
              <div className="qty-control">
                <button
                  className="qty-btn"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                >
                  −
                </button>
                <span className="qty-value">{qty}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  disabled={qty >= product.stock}
                >
                  +
                </button>
              </div>

              <button
                className={`add-to-cart-btn ${added ? "added" : ""}`}
                onClick={handleAddToCart}
              >
                {added ? "✓ Added to Cart!" : "Add to Cart"}
              </button>
            </div>
          )}

          {/* Back */}
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Go Back
          </button>
        </div>
      </div>

      {/* ── Related Products ── */}
      {related.length > 0 && (
        <section className="related-section">
          <h2 className="related-title">Related Products</h2>
          <div className="related-grid">
            {related.map((r) => (
              <RelatedCard key={r.id} product={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetailPage;
