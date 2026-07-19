import { Link } from "react-router-dom";
import "../Styles/Hero.css";
import heroImage from "../assets/hero.png";

const Hero = () => {
  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay */}
      <div className="hero-overlay"></div>

      {/* Decorative Orbs */}
      <div className="hero-orb hero-orb-1"></div>
      <div className="hero-orb hero-orb-2"></div>

      <div className="container">
        <div className="hero-content-wrapper">

          {/* Badge */}
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            #1 Rental Platform in India
          </div>

          {/* Heading */}
          <h1>
            Find Your Perfect{" "}
            <span className="hero-highlight">Dream Home</span>
            <br />
            Without the Hassle
          </h1>

          {/* Description */}
          <p>
            Comfort, Convenience &amp; Class — all in one place.
            Discover thousands of verified rental properties
            near you instantly.
          </p>

          {/* Buttons */}
          <div className="hero-buttons">

            {/* Browse Properties */}
            <Link
              to="/properties"
              className="btn-hero-primary"
            >
              🔍 Browse Properties
            </Link>

            {/* Register */}
            <Link
              to="/register"
              className="btn-hero-secondary"
            >
              🏡 List Your Property
            </Link>

          </div>

          {/* Statistics */}
          <div className="hero-stats">

            <div className="hero-stat">
              <div className="hero-stat-number">
                12K+
              </div>
              <div className="hero-stat-label">
                Properties Listed
              </div>
            </div>

            <div className="hero-stat">
              <div className="hero-stat-number">
                8K+
              </div>
              <div className="hero-stat-label">
                Happy Tenants
              </div>
            </div>

            <div className="hero-stat">
              <div className="hero-stat-number">
                500+
              </div>
              <div className="hero-stat-label">
                Verified Owners
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;