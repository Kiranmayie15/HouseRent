import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Spinner,
  Alert,
  ListGroup,
} from "react-bootstrap";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/properties/${id}`);

      if (res.data.success) {
        setProperty(res.data.property);
      }
    } catch (error) {
      console.error(error);
      setProperty(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!property) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          Property Not Found
        </Alert>

        <Button
          variant="primary"
          onClick={() => navigate("/tenant/properties")}
        >
          Back to Properties
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-4">

      <Button
        variant="secondary"
        className="mb-3"
        onClick={() => navigate(-1)}
      >
        ← Back
      </Button>

      <Row>

        <Col md={7}>
          <Card className="shadow">

            <Card.Img
              variant="top"
              src={
                property.images?.length > 0
                  ? property.images[0]
                  : "/no-image.png"
              }
              style={{
                height: "420px",
                objectFit: "cover",
              }}
            />

          </Card>
        </Col>

        <Col md={5}>
          <Card className="shadow">

            <Card.Body>

              <h2>{property.title}</h2>

              <Badge bg="success" className="mb-3">
                {property.status}
              </Badge>

              <hr />

              <p><strong>Location:</strong> {property.location}</p>
              <p><strong>Rent:</strong> ₹{property.rentAmount}</p>
              <p><strong>Property Type:</strong> {property.propertyType}</p>
              <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
              <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
              <p><strong>Furnishing:</strong> {property.furnishingStatus}</p>

              <hr />

              <h5>Description</h5>

              <p>{property.description}</p>

              <hr />

              <h5>Amenities</h5>

              {property.amenities?.length > 0 ? (
                property.amenities.map((item, index) => (
                  <Badge
                    bg="primary"
                    className="me-2 mb-2"
                    key={index}
                  >
                    {item}
                  </Badge>
                ))
              ) : (
                <p>No Amenities Available</p>
              )}

              <hr />

              <h5>Owner Details</h5>

              <ListGroup className="mb-4">

                <ListGroup.Item>
                  <strong>Name:</strong> {property.owner?.name || "N/A"}
                </ListGroup.Item>

                <ListGroup.Item>
                  <strong>Email:</strong> {property.owner?.email || "N/A"}
                </ListGroup.Item>

                <ListGroup.Item>
                  <strong>Phone:</strong> {property.owner?.phone || "N/A"}
                </ListGroup.Item>

              </ListGroup>

              <Button
                variant="success"
                className="w-100"
                onClick={() =>
                  navigate("/tenant/booking", {
                    state: { property },
                  })
                }
              >
                Book Now
              </Button>

            </Card.Body>

          </Card>
        </Col>

      </Row>

    </Container>
  );
};

export default PropertyDetails;