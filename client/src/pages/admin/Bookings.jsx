import { useEffect, useState } from "react";
import API from "../../api/axios";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { toast } from "react-toastify";

import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Spinner,
  Form,
  Badge,
} from "react-bootstrap";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    const filtered = bookings.filter((booking) => {
      const tenant = booking.tenant?.name || "";
      const property = booking.property?.title || "";
      const owner = booking.property?.owner?.name || "";

      return (
        tenant.toLowerCase().includes(search.toLowerCase()) ||
        property.toLowerCase().includes(search.toLowerCase()) ||
        owner.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFilteredBookings(filtered);
  }, [search, bookings]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/admin/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(res.data.bookings || []);
      setFilteredBookings(res.data.bookings || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/admin/booking/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Booking deleted successfully");

      fetchBookings();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete booking");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return <Badge bg="success">Approved</Badge>;

      case "Rejected":
        return <Badge bg="danger">Rejected</Badge>;

      default:
        return <Badge bg="warning">Pending</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="d-flex">

      <AdminSidebar />

      <Container fluid className="p-4">

        <Row className="mb-4">

          <Col>
            <h2 className="fw-bold">
              Booking Management
            </h2>
          </Col>

          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Search bookings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>

        </Row>

        <Table
          striped
          bordered
          hover
          responsive
        >

          <thead className="table-dark">

            <tr>

              <th>#</th>

              <th>Tenant</th>

              <th>Owner</th>

              <th>Property</th>

              <th>Location</th>

              <th>Rent</th>

              <th>Status</th>

              <th>Date</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredBookings.length === 0 ? (

              <tr>

                <td
                  colSpan="9"
                  className="text-center"
                >
                  No Bookings Found
                </td>

              </tr>

            ) : (

              filteredBookings.map((booking, index) => (

                <tr key={booking._id}>

                  <td>{index + 1}</td>

                  <td>
                    {booking.tenant?.name || "N/A"}
                  </td>

                  <td>
                    {booking.property?.owner?.name || "N/A"}
                  </td>

                  <td>
                    {booking.property?.title || "N/A"}
                  </td>

                  <td>
                    {booking.property?.location || "N/A"}
                  </td>

                  <td>
                    ₹{booking.property?.rentAmount || 0}
                  </td>

                  <td>
                    {getStatusBadge(booking.status)}
                  </td>

                  <td>
                    {booking.createdAt
                      ? new Date(
                          booking.createdAt
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        deleteBooking(booking._id)
                      }
                    >
                      Delete
                    </Button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </Table>

      </Container>

    </div>
  );
};

export default Bookings;