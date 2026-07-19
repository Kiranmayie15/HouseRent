import React from "react";
import { useNavigate } from "react-router-dom";
import "./PropertyCard.css";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const isAvailable = property.status === "Available";
  const imgSrc =
    property.images && property.images.length > 0
      ? property.images[0]
      : "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80";

  return (
    <div
      className="property-card"
      onClick={() => navigate(`/tenant/property/${property._id}`)}
    >
      {/* Image */}
      <div className="property-card__img-wrap">
        <img
          src={imgSrc}
          alt={property.title}
          className="property-card__img"
          loading="lazy"
        />
        {/* Status Badge */}
        <span
          className={`property-card__badge ${
            isAvailable ? "badge--available" : "badge--rented"
          }`}
        >
          <span className="badge-dot" />
          {property.status}
        </span>
        {/* Hover overlay */}
        <div className="property-card__overlay">
          <span className="overlay-cta">View Details →</span>
        </div>
      </div>

      {/* Body */}
      <div className="property-card__body">

        {/* Type pill */}
        <span className="property-card__type">{property.propertyType}</span>

        {/* Title */}
        <h3 className="property-card__title">{property.title}</h3>

        {/* Location */}
        <p className="property-card__location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle cx="12" cy="9" r="2.5"/>
          </svg>
          {property.location}
        </p>

        {/* Stats row */}
        <div className="property-card__stats">
          <div className="stat-item">
            <span className="stat-icon">🛏</span>
            <span>{property.bedrooms} Bed</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-icon">🏠</span>
            <span>{property.propertyType}</span>
          </div>
        </div>

        {/* Footer: price + button */}
        <div className="property-card__footer">
          <div className="property-card__price">
            <span className="price-amount">₹{Number(property.rentAmount).toLocaleString("en-IN")}</span>
            <span className="price-unit">/month</span>
          </div>
          <button className="property-card__btn">
            Details
          </button>
        </div>

      </div>
    </div>
  );
};

export default PropertyCard;