import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">⬡</span>
          <span className="logo-text">PRISM</span>
          <span className="logo-sub">STORE</span>
        </Link>

        {/* Nav Links */}
        <ul className="navbar-links">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Products
            </NavLink>
          </li>
        </ul>

        {/* Cart Icon */}
        <button className="navbar-cart" aria-label="Cart">
          <span className="cart-icon">🛒</span>
          <span className="cart-badge">0</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
