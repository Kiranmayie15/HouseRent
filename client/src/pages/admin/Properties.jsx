import { useEffect, useState } from "react";
import API from "../../api/axios";
import AdminSidebar from "../../components/admin/AdminSidebar";

import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Spinner,
  Form,
} from "react-bootstrap";

import { toast } from "react-toastify";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    const filtered = properties.filter((property) =>
      property.title.toLowerCase().includes(search.toLowerCase()) ||
      property.location.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredProperties(filtered);
  }, [search, properties]);

  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/admin/properties", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProperties(res.data.properties);
      setFilteredProperties(res.data.properties);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (id) => {
    if (!window.confirm("Delete this property?")) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/admin/property/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Property deleted successfully");

      fetchProperties();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete property");
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

        <Row className="mb-3">
          <Col>
            <h2>Property Management</h2>
          </Col>

          <Col md={4}>
            <Form.Control
              placeholder="Search property..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
        </Row>

        <Table bordered hover responsive striped>

          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Owner</th>
              <th>Location</th>
              <th>Rent</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredProperties.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No Properties Found
                </td>
              </tr>
            ) : (
              filteredProperties.map((property, index) => (
                <tr key={property._id}>
                  <td>{index + 1}</td>

                  <td>{property.title}</td>

                  <td>{property.owner?.name}</td>

                  <td>{property.location}</td>

                  <td>₹ {property.rentAmount}</td>

                  <td>{property.propertyType}</td>

                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteProperty(property._id)}
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

export default Properties;