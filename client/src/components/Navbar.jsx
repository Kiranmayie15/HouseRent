import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Styles/Navbar.css";

const NavigationBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setExpanded(false); }, [location]);

  const navLinks = [
    { label: "Home",       to: "/" },
    { label: "Properties", to: "/properties" },
    { label: "About",      to: "#about" },
    { label: "Contact",    to: "#contact" },
  ];

  return (
    <nav className={`custom-navbar${scrolled ? " scrolled" : ""}`}>
      <div className="container d-flex align-items-center justify-content-between py-1">

        {/* Logo */}
        <Link to="/" className="nav-logo text-decoration-none">
          <span className="nav-logo-icon">🏠</span>
          RentEase
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-label="Toggle navigation"
        >
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "#fff",
              margin: "5px 0",
              borderRadius: 2,
              transition: "all 0.3s",
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "#fff",
              margin: "5px 0",
              borderRadius: 2,
              transition: "all 0.3s",
              opacity: expanded ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "#fff",
              margin: "5px 0",
              borderRadius: 2,
              transition: "all 0.3s",
            }}
          />
        </button>

        {/* Desktop Nav + Mobile Collapse */}
        <div
          className={`d-lg-flex align-items-center gap-1 ${
            expanded ? "d-block navbar-collapse" : "d-none d-lg-flex"
          }`}
        >
          {/* Nav Links */}
          <div className="d-flex flex-column flex-lg-row align-items-lg-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="nav-link"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="nav-btn-group d-flex align-items-center gap-2 ms-lg-3">
            <Link to="/login" className="btn btn-nav-login">
              Login
            </Link>
            <Link to="/register" className="btn btn-nav-register">
              Get Started
            </Link>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default NavigationBar;