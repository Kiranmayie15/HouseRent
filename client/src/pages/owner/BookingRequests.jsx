import { useEffect, useState } from "react";
import API from "../../api/axios";
import { Container, Card, Table, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const BookingRequests = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");

      setBookings(res.data.bookings || []);
    } catch (error) {
      toast.error("Failed to load booking requests");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/bookings/${id}`, {
        status,
      });

      toast.success(`Booking ${status}`);

      fetchBookings();
    } catch (error) {
      toast.error("Failed to update booking");
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-5">

      <Card className="shadow">

        <Card.Body>

          <h2 className="mb-4">
            Booking Requests
          </h2>

          {bookings.length === 0 ? (
            <h5 className="text-center text-muted">
              No Booking Requests Found
            </h5>
          ) : (
            <Table striped bordered hover responsive>

              <thead>

                <tr>
                  <th>#</th>
                  <th>Tenant</th>
                  <th>Property</th>
                  <th>Move In</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {bookings.map((booking, index) => (

                  <tr key={booking._id}>

                    <td>{index + 1}</td>

                    <td>
                      {booking.tenant?.name || "N/A"}
                    </td>

                    <td>
                      {booking.property?.title || "N/A"}
                    </td>

                    <td>
                      {booking.moveInDate
                        ? new Date(
                            booking.moveInDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td>

                      <span
                        className={`badge ${
                          booking.status === "Approved"
                            ? "bg-success"
                            : booking.status === "Rejected"
                            ? "bg-danger"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {booking.status}
                      </span>

                    </td>

                    <td>

                      {booking.status === "Pending" ? (
                        <>
                          <Button
                            variant="success"
                            size="sm"
                            className="me-2"
                            onClick={() =>
                              updateStatus(
                                booking._id,
                                "Approved"
                              )
                            }
                          >
                            Approve
                          </Button>

                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() =>
                              updateStatus(
                                booking._id,
                                "Rejected"
                              )
                            }
                          >
                            Reject
                          </Button>
                        </>
                      ) : (
                        <span>No Action</span>
                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </Table>
          )}

        </Card.Body>

      </Card>

    </Container>
  );
};

export default BookingRequests;