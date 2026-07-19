import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/axios";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [property, setProperty] = useState({
    title: "",
    description: "",
    location: "",
    rentAmount: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    furnishingStatus: "",
    amenities: "",
    images: "",
  });

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const res = await API.get(`/properties/${id}`);

      const data = res.data.property;

      setProperty({
        title: data.title || "",
        description: data.description || "",
        location: data.location || "",
        rentAmount: data.rentAmount || "",
        propertyType: data.propertyType || "",
        bedrooms: data.bedrooms || "",
        bathrooms: data.bathrooms || "",
        furnishingStatus: data.furnishingStatus || "",
        amenities: Array.isArray(data.amenities)
          ? data.amenities.join(", ")
          : data.amenities || "",
        images: Array.isArray(data.images)
          ? data.images.join(", ")
          : data.images || "",
      });

      setLoading(false);
    } catch (error) {
      toast.error("Failed to load property");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/properties/${id}`, {
        ...property,
        amenities: property.amenities
          .split(",")
          .map((item) => item.trim()),

        images: property.images
          .split(",")
          .map((item) => item.trim()),
      });

      toast.success("Property Updated Successfully");

      navigate("/owner/my-properties");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update Failed"
      );
    }
  };

  if (loading) {
    return (
      <Container className="mt-5">
        <h4>Loading...</h4>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card className="shadow p-4">
        <h2 className="text-center mb-4">Edit Property</h2>

        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3">
            <Form.Label>Property Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={property.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={property.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Row>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={property.location}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Rent Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="rentAmount"
                  value={property.rentAmount}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

          </Row>

          <Row>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Property Type</Form.Label>
                <Form.Select
                  name="propertyType"
                  value={property.propertyType}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Villa</option>
                  <option>PG</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Bedrooms</Form.Label>
                <Form.Control
                  type="number"
                  name="bedrooms"
                  value={property.bedrooms}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Bathrooms</Form.Label>
                <Form.Control
                  type="number"
                  name="bathrooms"
                  value={property.bathrooms}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Furnishing Status</Form.Label>

            <Form.Select
              name="furnishingStatus"
              value={property.furnishingStatus}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option>Fully Furnished</option>
              <option>Semi Furnished</option>
              <option>Unfurnished</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amenities (comma separated)</Form.Label>

            <Form.Control
              type="text"
              name="amenities"
              value={property.amenities}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Image URLs (comma separated)</Form.Label>

            <Form.Control
              type="text"
              name="images"
              value={property.images}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-grid">
            <Button type="submit" variant="primary">
              Update Property
            </Button>
          </div>

        </Form>
      </Card>
    </Container>
  );
};

export default EditProperty;