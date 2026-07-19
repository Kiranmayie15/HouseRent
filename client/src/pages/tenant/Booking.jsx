import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../../api/axios";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { toast } from "react-toastify";

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const property = location.state?.property;

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!property) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          No Property Selected.
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

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      toast.error("Please select Start Date and End Date");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      toast.error("End Date cannot be before Start Date");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/bookings", {
        propertyId: property._id,
        startDate,
        endDate,
        message,
      });

      if (res.data.success) {
        toast.success("Booking Request Sent Successfully");
        navigate("/tenant/my-bookings");
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Booking Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4 mb-5">

      <Card className="shadow">

        <Card.Header className="bg-primary text-white">
          <h3 className="mb-0">
            Confirm Booking
          </h3>
        </Card.Header>

        <Card.Body>

          <Row>

            <Col md={5}>

              <img
                src={
                  property.images?.length > 0
                    ? property.images[0]
                    : "/no-image.png"
                }
                alt={property.title}
                className="img-fluid rounded"
                style={{
                  height: "320px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />

            </Col>

            <Col md={7}>

              <h3>{property.title}</h3>

              <hr />

              <p>
                <strong>Location:</strong> {property.location}
              </p>

              <p>
                <strong>Rent:</strong> ₹{property.rentAmount}
              </p>

              <p>
                <strong>Property Type:</strong> {property.propertyType}
              </p>

              <p>
                <strong>Bedrooms:</strong> {property.bedrooms}
              </p>

              <p>
                <strong>Bathrooms:</strong> {property.bathrooms}
              </p>

              <p>
                <strong>Status:</strong> {property.status}
              </p>

              <hr />

              <Form onSubmit={handleBooking}>

                <Form.Group className="mb-3">
                  <Form.Label>
                    Start Date
                  </Form.Label>

                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) =>
                      setStartDate(e.target.value)
                    }
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    End Date
                  </Form.Label>

                  <Form.Control
                    type="date"
                    value={endDate}
                    onChange={(e) =>
                      setEndDate(e.target.value)
                    }
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">

                  <Form.Label>
                    Message to Owner
                  </Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Write your message..."
                    value={message}
                    onChange={(e) =>
                      setMessage(e.target.value)
                    }
                  />

                </Form.Group>

                <Button
                  type="submit"
                  variant="success"
                  disabled={loading}
                  className="me-2"
                >
                  {loading
                    ? "Booking..."
                    : "Confirm Booking"}
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>

              </Form>

            </Col>

          </Row>

        </Card.Body>

      </Card>

    </Container>
  );
};

export default Booking;