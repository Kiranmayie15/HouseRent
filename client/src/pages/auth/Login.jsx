import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
} from "react-bootstrap";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Home,
} from "@mui/icons-material";

import { toast } from "react-toastify";

import "../../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login Successful");

      const user = res.data.user;

      if (user.userType === "Owner") {
        navigate("/owner/dashboard");
      } else if (user.userType === "Tenant") {
        navigate("/tenant/dashboard");
      } else if (user.userType === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
  console.log("Status:", error.response?.status);
  console.log("Response:", error.response?.data);

  toast.error(
    error.response?.data?.message || "Login Failed"
  );
}
  };

  return (
    <div className="login-page">

      {/* Overlay */}
      <div className="overlay">

        <Container fluid>

          <Row className="justify-content-center align-items-center min-vh-100">

            {/* Left Side */}

            <Col lg={6} className="text-white d-none d-lg-block">

              <div className="hero-content">

                <h1 className="display-3 fw-bold">
                  RentEase
                </h1>

                <h2 className="mt-4">
                  Find Your Dream Rental Property
                </h2>

                <p className="mt-3 fs-5">
                  Comfort, Convenience & Affordable Homes
                  at your fingertips.
                </p>

              </div>

            </Col>

            {/* Login Card */}

            <Col lg={4} md={8} sm={11}>

              <Card className="login-card shadow-lg">

                <Card.Body className="p-5">

                  <div className="text-center mb-4">

                    <Home
                      sx={{
                        fontSize: 60,
                        color: "#4F46E5",
                      }}
                    />

                    <h2 className="fw-bold mt-2">
                      Welcome Back
                    </h2>

                    <p className="text-muted">
                      Login to your account
                    </p>

                  </div>

                  <Form onSubmit={handleSubmit}>

                    <TextField
                      fullWidth
                      margin="normal"
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      fullWidth
                      margin="normal"
                      label="Password"
                      name="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={formData.password}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock />
                          </InputAdornment>
                        ),

                        endAdornment: (
                          <InputAdornment position="end">

                            <IconButton
                              onClick={() =>
                                setShowPassword(
                                  !showPassword
                                )
                              }
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>

                          </InputAdornment>
                        ),
                      }}
                    />

                    <div className="d-flex justify-content-between mt-3">

                      <Form.Check
                        label="Remember Me"
                      />

                      <Link
                        to="/forgot-password"
                        className="text-decoration-none"
                      >
                        Forgot Password?
                      </Link>

                    </div>

                    <Button
                      type="submit"
                      className="w-100 login-btn mt-4"
                      disabled={loading}
                    >
                      {loading
                        ? "Logging In..."
                        : "Login"}
                    </Button>

                  </Form>

                  <div className="text-center mt-4">

                    <p>

                      Don't have an account?{" "}

                      <Link
                        to="/register"
                        className="fw-bold"
                      >
                        Register
                      </Link>

                    </p>

                  </div>

                </Card.Body>

              </Card>

            </Col>

          </Row>

        </Container>

      </div>

    </div>
  );
};

export default Login;