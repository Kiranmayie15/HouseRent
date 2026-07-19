import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { toast } from "react-toastify";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
} from "react-bootstrap";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const AddProperty = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    rentAmount: "",
    propertyType: "Apartment",
    adType: "Rent",
    bedrooms: 1,
    bathrooms: 1,
    furnishingStatus: "Unfurnished",
    amenities: "",
    status: "Available",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("location", formData.location);
      data.append("rentAmount", formData.rentAmount);
      data.append("propertyType", formData.propertyType);
      data.append("adType", formData.adType);
      data.append("bedrooms", formData.bedrooms);
      data.append("bathrooms", formData.bathrooms);
      data.append(
        "furnishingStatus",
        formData.furnishingStatus
      );
      data.append("status", formData.status);

      if (formData.amenities !== "") {
        formData.amenities
          .split(",")
          .forEach((item) => {
            data.append("amenities", item.trim());
          });
      }

      for (let i = 0; i < images.length; i++) {
        data.append("images", images[i]);
      }

      const res = await API.post(
        "/properties",
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success(
        res.data.message ||
          "Property Added Successfully"
      );

      navigate("/owner/my-properties");

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to Add Property"
      );
    }
  };

  return (
    
    <Container className="mt-5">
  <Row className="justify-content-center">
    <Col md={8}>
      <Card className="shadow">
        <Card.Body>

          <h2 className="text-center mb-4">
            Add New Property
          </h2>

          <Form onSubmit={handleSubmit}>

            <TextField
              fullWidth
              margin="normal"
              label="Property Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              multiline
              rows={4}
              margin="normal"
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              margin="normal"
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              type="number"
              margin="normal"
              label="Rent Amount"
              name="rentAmount"
              value={formData.rentAmount}
              onChange={handleChange}
              required
            />

            <TextField
              select
              fullWidth
              margin="normal"
              label="Property Type"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
            >
              <MenuItem value="Apartment">
                Apartment
              </MenuItem>

              <MenuItem value="House">
                House
              </MenuItem>

              <MenuItem value="Villa">
                Villa
              </MenuItem>

              <MenuItem value="PG">
                PG
              </MenuItem>

              <MenuItem value="Hostel">
                Hostel
              </MenuItem>

            </TextField>

            <TextField
              select
              fullWidth
              margin="normal"
              label="Ad Type"
              name="adType"
              value={formData.adType}
              onChange={handleChange}
            >
              <MenuItem value="Rent">
                Rent
              </MenuItem>

              <MenuItem value="Sale">
                Sale
              </MenuItem>

            </TextField>

            <Row>

              <Col>

                <TextField
                  fullWidth
                  type="number"
                  margin="normal"
                  label="Bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                />

              </Col>

              <Col>

                <TextField
                  fullWidth
                  type="number"
                  margin="normal"
                  label="Bathrooms"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                />

              </Col>

            </Row>

            <TextField
              select
              fullWidth
              margin="normal"
              label="Furnishing Status"
              name="furnishingStatus"
              value={formData.furnishingStatus}
              onChange={handleChange}
            >
              <MenuItem value="Fully Furnished">
                Fully Furnished
              </MenuItem>

              <MenuItem value="Semi Furnished">
                Semi Furnished
              </MenuItem>

              <MenuItem value="Unfurnished">
                Unfurnished
              </MenuItem>

            </TextField>

            <TextField
              select
              fullWidth
              margin="normal"
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="Available">
                Available
              </MenuItem>

              <MenuItem value="Booked">
                Booked
              </MenuItem>

            </TextField>

            <TextField
              fullWidth
              margin="normal"
              label="Amenities"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              helperText="Example: WiFi, Parking, Lift, Security"
            />

            <Form.Group className="mt-3 mb-3">

              <Form.Label>
                Upload Property Images
              </Form.Label>

              <Form.Control
                type="file"
                multiple
                accept="image/*"
                onChange={(e) =>
                  setImages(e.target.files)
                }
              />

            </Form.Group>

                        <div className="d-grid mt-4">

              <Button
                type="submit"
                variant="primary"
                size="lg"
              >
                Add Property
              </Button>

            </div>

          </Form>

        </Card.Body>

      </Card>

    </Col>

  </Row>

</Container>

  );
};

export default AddProperty;