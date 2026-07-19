import { useEffect, useState } from "react";
import API from "../../api/axios";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/my-bookings");

      if (res.data.success) {
        setBookings(res.data.bookings);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return <Badge bg="warning">Pending</Badge>;

      case "Approved":
        return <Badge bg="success">Approved</Badge>;

      case "Rejected":
        return <Badge bg="danger">Rejected</Badge>;

      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <h5 className="mt-3">Loading Bookings...</h5>
      </Container>
    );
  }

  return (
    <Container className="mt-4">

      <h2 className="text-center mb-4">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <Alert variant="info" className="text-center">
          No Bookings Found
        </Alert>
      ) : (
        <Row>

          {bookings.map((booking) => (
            <Col md={6} lg={4} key={booking._id} className="mb-4">

              <Card className="shadow h-100">

                <Card.Img
                  variant="top"
                  src={
                    booking.property?.images?.length > 0
                      ? booking.property.images[0]
                      : "/no-image.png"
                  }
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                <Card.Body>

                  <Card.Title>
                    {booking.property?.title}
                  </Card.Title>

                  <Card.Text>
                    <strong>Location:</strong>{" "}
                    {booking.property?.location}
                  </Card.Text>

                  <Card.Text>
                    <strong>Rent:</strong> ₹
                    {booking.property?.rentAmount}
                  </Card.Text>

                  <Card.Text>
                    <strong>Move In Date:</strong>{" "}
                    {booking.moveInDate
                      ? new Date(
                          booking.moveInDate
                        ).toLocaleDateString()
                      : "-"}
                  </Card.Text>

                  <Card.Text>
                    <strong>Status:</strong>{" "}
                    {getStatusBadge(booking.status)}
                  </Card.Text>

                  <Card.Text>
                    <strong>Owner:</strong>{" "}
                    {booking.property?.owner?.name}
                  </Card.Text>

                  <Card.Text>
                    <strong>Email:</strong>{" "}
                    {booking.property?.owner?.email}
                  </Card.Text>

                  <Card.Text>
                    <strong>Your Message:</strong>
                    <br />
                    {booking.message || "No Message"}
                  </Card.Text>

                </Card.Body>

              </Card>

            </Col>
          ))}

        </Row>
      )}

    </Container>
  );
};

export default MyBookings;