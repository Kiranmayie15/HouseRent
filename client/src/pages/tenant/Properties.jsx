import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    filterProperties();
  }, [search, type, properties]);

  const fetchProperties = async () => {
    try {
      setLoading(true);

      const res = await API.get("/properties");

      if (res.data.success) {
        setProperties(res.data.properties);
        setFilteredProperties(res.data.properties);
      } else {
        setError("Failed to load properties.");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to fetch properties.");
    } finally {
      setLoading(false);
    }
  };

  const filterProperties = () => {
    let data = [...properties];

    if (search.trim() !== "") {
      data = data.filter((property) =>
        property.location
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (type !== "") {
      data = data.filter(
        (property) => property.propertyType === type
      );
    }

    setFilteredProperties(data);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <h5 className="mt-3">Loading Properties...</h5>
      </Container>
    );
  }

  return (
    <Container className="mt-4">

      <h2 className="text-center mb-4">
        Available Properties
      </h2>

      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      <Row className="mb-4">

        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by Location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>

        <Col md={6}>
          <Form.Select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All Property Types</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="PG">PG</option>
            <option value="Hostel">Hostel</option>
          </Form.Select>
        </Col>

      </Row>

      <Row>

        {filteredProperties.length === 0 ? (
          <Col>
            <Alert variant="warning" className="text-center">
              No Properties Available
            </Alert>
          </Col>
        ) : (
          filteredProperties.map((property) => (
            <Col
              md={4}
              className="mb-4"
              key={property._id}
            >

              <Card className="shadow h-100">

                <Card.Img
                  variant="top"
                  src={
                    property.images &&
                    property.images.length > 0
                      ? property.images[0]
                      : "https://via.placeholder.com/400x250?text=No+Image"
                  }
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                <Card.Body>

                  <Card.Title>
                    {property.title}
                  </Card.Title>

                  <Card.Text>
                    <strong>Location:</strong>{" "}
                    {property.location}
                  </Card.Text>

                  <Card.Text>
                    <strong>Rent:</strong> ₹
                    {property.rentAmount}
                  </Card.Text>

                  <Card.Text>
                    <strong>Property Type:</strong>{" "}
                    {property.propertyType}
                  </Card.Text>

                  <Card.Text>
                    <strong>Bedrooms:</strong>{" "}
                    {property.bedrooms}
                  </Card.Text>

                  <Card.Text>
                    <strong>Bathrooms:</strong>{" "}
                    {property.bathrooms}
                  </Card.Text>

                  <Card.Text>
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        property.status === "Available"
                          ? "text-success fw-bold"
                          : "text-danger fw-bold"
                      }
                    >
                      {property.status}
                    </span>
                  </Card.Text>

                  <Button
                    as={Link}
                    to={`/tenant/property/${property._id}`}
                    variant="primary"
                    className="w-100"
                  >
                    View Details
                  </Button>

                </Card.Body>

              </Card>

            </Col>
          ))
        )}

      </Row>

    </Container>
  );
};

export default Properties;