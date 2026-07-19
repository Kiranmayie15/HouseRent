import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import AdminSidebar from "../../components/admin/AdminSidebar";

import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Button,
} from "react-bootstrap";

import {
  People,
  Home,
  Apartment,
  BookOnline,
  Logout,
} from "@mui/icons-material";

const Dashboard = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalOwners: 0,
    totalTenants: 0,
    totalProperties: 0,
    totalBookings: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.dashboard) {
        setDashboard(res.data.dashboard);
      } else {
        setDashboard(res.data);
      }
    } catch (error) {
      console.log(error);

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
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

      <div style={{ flex: 1 }}>

        {/* Header */}

        <div
          className="d-flex justify-content-between align-items-center px-4"
          style={{
            height: "70px",
            background: "#ffffff",
            borderBottom: "1px solid #ddd",
          }}
        >
          <h3 className="fw-bold m-0">
            HouseRent Admin
          </h3>

          <Button
            variant="danger"
            onClick={logoutHandler}
          >
            <Logout className="me-2" />
            Logout
          </Button>
        </div>

        <Container fluid className="p-4">

          <h2 className="mb-4">
            Dashboard
          </h2>

          <Row>

            <Col md={4} className="mb-4">

              <Card className="shadow border-0">

                <Card.Body className="text-center">

                  <People
                    sx={{
                      fontSize: 45,
                      color: "#1976d2",
                    }}
                  />

                  <h5 className="mt-3">
                    Total Users
                  </h5>

                  <h2>{dashboard.totalUsers}</h2>

                </Card.Body>

              </Card>

            </Col>

            <Col md={4} className="mb-4">

              <Card className="shadow border-0">

                <Card.Body className="text-center">

                  <Home
                    sx={{
                      fontSize: 45,
                      color: "green",
                    }}
                  />

                  <h5 className="mt-3">
                    Total Owners
                  </h5>

                  <h2>{dashboard.totalOwners}</h2>

                </Card.Body>

              </Card>

            </Col>

            <Col md={4} className="mb-4">

              <Card className="shadow border-0">

                <Card.Body className="text-center">

                  <People
                    sx={{
                      fontSize: 45,
                      color: "orange",
                    }}
                  />

                  <h5 className="mt-3">
                    Total Tenants
                  </h5>

                  <h2>{dashboard.totalTenants}</h2>

                </Card.Body>

              </Card>

            </Col>

            <Col md={6} className="mb-4">

              <Card className="shadow border-0">

                <Card.Body className="text-center">

                  <Apartment
                    sx={{
                      fontSize: 45,
                      color: "purple",
                    }}
                  />

                  <h5 className="mt-3">
                    Total Properties
                  </h5>

                  <h2>{dashboard.totalProperties}</h2>

                </Card.Body>

              </Card>

            </Col>

            <Col md={6} className="mb-4">

              <Card className="shadow border-0">

                <Card.Body className="text-center">

                  <BookOnline
                    sx={{
                      fontSize: 45,
                      color: "red",
                    }}
                  />

                  <h5 className="mt-3">
                    Total Bookings
                  </h5>

                  <h2>{dashboard.totalBookings}</h2>

                </Card.Body>

              </Card>

            </Col>

          </Row>

        </Container>

      </div>

    </div>
  );
};

export default Dashboard;