import React from "react";
import { Card } from "react-bootstrap";

const StatCard = ({ title, value, color }) => {
  return (
    <Card
      className="shadow-sm border-0 mb-4"
      style={{
        borderLeft: `5px solid ${color}`,
        borderRadius: "10px",
      }}
    >
      <Card.Body>
        <h6
          style={{
            color: "#6c757d",
            fontWeight: "600",
          }}
        >
          {title}
        </h6>

        <h2
          style={{
            color: color,
            fontWeight: "bold",
          }}
        >
          {value}
        </h2>
      </Card.Body>
    </Card>
  );
};

export default StatCard;