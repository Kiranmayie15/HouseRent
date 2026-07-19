import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../api/axios";
import { toast } from "react-toastify";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from "react-bootstrap";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "Tenant",
    currentLocation: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        userType: formData.userType,
        currentLocation: formData.currentLocation,
      });

      if (res.data.success) {
        toast.success("Registration Successful");

        navigate("/login");
      }

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
      }}
    >
      <Row className="w-100 justify-content-center">

        <Col md={6} lg={5}>

          <Card className="shadow p-4">

            <Card.Body>

              <h2 className="text-center mb-4">
                Register
              </h2>

              <Form onSubmit={handleRegister}>

                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>

                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>

                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>

                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>

                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>

                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>User Type</Form.Label>

                  <Form.Select
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                  >
                    <option value="Tenant">
                      Tenant
                    </option>

                    <option value="Owner">
                      Owner
                    </option>

                    <option value="Admin">
                      Admin
                    </option>

                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>
                    Current Location
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="currentLocation"
                    value={formData.currentLocation}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100"
                  variant="primary"
                >
                  Register
                </Button>

              </Form>

              <div className="text-center mt-3">

                Already have an account?

                <Link
                  to="/login"
                  className="ms-2"
                >
                  Login
                </Link>

              </div>

            </Card.Body>

          </Card>

        </Col>

      </Row>
    </Container>
  );
};

export default Register;