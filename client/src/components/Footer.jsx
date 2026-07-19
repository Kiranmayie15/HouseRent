import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-glow" />

      <div className="container footer-inner">

        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">🏠 RentEase</div>
          <p className="footer-tagline">
            Connecting tenants with dream homes and owners with reliable renters —
            smarter, faster, simpler.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-btn" aria-label="Twitter">𝕏</a>
            <a href="#" className="social-btn" aria-label="Instagram">📸</a>
            <a href="#" className="social-btn" aria-label="LinkedIn">💼</a>
          </div>
        </div>

        {/* Links */}
        <div className="footer-links-group">
          <h4 className="footer-links-title">Platform</h4>
          <Link to="/properties" className="footer-link">Browse Properties</Link>
          <Link to="/register"   className="footer-link">List a Property</Link>
          <Link to="/login"      className="footer-link">Login</Link>
          <Link to="/register"   className="footer-link">Register</Link>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-links-title">Company</h4>
          <a href="#about"   className="footer-link">About Us</a>
          <a href="#contact" className="footer-link">Contact</a>
          <a href="#"        className="footer-link">Privacy Policy</a>
          <a href="#"        className="footer-link">Terms of Service</a>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-links-title">Support</h4>
          <a href="#" className="footer-link">Help Center</a>
          <a href="#" className="footer-link">FAQs</a>
          <a href="#" className="footer-link">Report an Issue</a>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p>© {year} RentEase. All Rights Reserved.</p>
        <p className="footer-made">Made with ❤️ in India</p>
      </div>
    </footer>
  );
};

export default Footer;