import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

import {
  Container,
  Table,
  Button,
  Spinner,
  Alert,
  Card,
} from "react-bootstrap";

const MyProperties = () => {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);

      const res = await API.get("/properties/owner/my-properties");

      if (res.data.success) {
        setProperties(res.data.properties || []);
      }
    } catch (error) {
      console.error("Fetch Properties Error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to load properties."
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmDelete) return;

    try {
      const res = await API.delete(`/properties/${id}`);

      if (res.data.success) {
        alert("Property Deleted Successfully");

        fetchProperties();
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Delete Failed"
      );
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />

        <h5 className="mt-3">
          Loading Properties...
        </h5>
      </Container>
    );
  }

  return (
    <Container fluid className="mt-4">

      <Card className="shadow">

        <Card.Body>

          <h2 className="text-center mb-4">
            All Properties
          </h2>

          {properties.length === 0 ? (

            <Alert variant="warning">
              No Properties Found
            </Alert>

          ) : (

            <Table
              bordered
              hover
              responsive
              className="text-center align-middle"
            >

              <thead className="table-dark">

                <tr>

                  <th>Property ID</th>

                  <th>Property Type</th>

                  <th>Ad Type</th>

                  <th>Location</th>

                  <th>Owner Contact</th>

                  <th>Rent Amount</th>

                  <th>Status</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {properties.map((property) => (

                  <tr key={property._id}>

                    <td>{property._id}</td>

                    <td>{property.propertyType}</td>

                    <td>{property.adType || "-"}</td>

                    <td>{property.location}</td>

                    <td>{property.owner?.phone || "-"}</td>

                    <td>₹ {property.rentAmount}</td>

                    <td>

                      <span
                        className={
                          property.status === "Available"
                            ? "text-success fw-bold"
                            : "text-danger fw-bold"
                        }
                      >
                        {property.status}
                      </span>

                    </td>

                    <td>

                      <Button
                        variant="primary"
                        size="sm"
                        className="me-2"
                        onClick={() =>
                          navigate(
                            `/owner/edit-property/${property._id}`
                          )
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() =>
                          deleteProperty(property._id)
                        }
                      >
                        Delete
                      </Button>

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

export default MyProperties;