import React from "react";
import "./Loader.css";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="loader-container">
      <div className="loader-content">
        {/* Spinner rings */}
        <div className="loader-ring">
          <div className="loader-ring-inner" />
        </div>
        {/* Logo */}
        <div className="loader-logo">🏠</div>
        {/* Text */}
        <p className="loader-text">{message}</p>
      </div>
    </div>
  );
};

export default Loader;