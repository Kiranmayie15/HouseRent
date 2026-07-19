import { useEffect, useState } from "react";
import API from "../../api/axios";
import AdminSidebar from "../../components/admin/AdminSidebar";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";

import { toast } from "react-toastify";

const Profile = () => {
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    userType: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(res.data.user);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.put("/auth/profile", profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
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

        <Row className="justify-content-center">

          <Col md={8} lg={6}>

            <Card className="shadow">

              <Card.Header className="bg-primary text-white">
                <h4 className="mb-0">
                  Admin Profile
                </h4>
              </Card.Header>

              <Card.Body>

                <Form onSubmit={updateProfile}>

                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>

                    <Form.Control
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>

                    <Form.Control
                      type="email"
                      value={profile.email}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>

                    <Form.Control
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>

                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="address"
                      value={profile.address}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>User Type</Form.Label>

                    <Form.Control
                      value={profile.userType}
                      disabled
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100"
                  >
                    Update Profile
                  </Button>

                </Form>

              </Card.Body>

            </Card>

          </Col>

        </Row>

      </Container>

    </div>
  );
};

export default Profile;