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

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const result = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredUsers(result);
  }, [search, users]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data.users);
      setFilteredUsers(res.data.users);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load users");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/admin/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("User deleted successfully");

      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user");
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
            <h2>Users Management</h2>
          </Col>

          <Col md={4}>
            <Form.Control
              placeholder="Search user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
        </Row>

        <Table bordered hover responsive striped>

          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>User Type</th>
              <th>Approved</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No Users Found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>{user.phone}</td>

                  <td>{user.userType}</td>

                  <td>
                    {user.isApproved ? (
                      <span className="badge bg-success">
                        Approved
                      </span>
                    ) : (
                      <span className="badge bg-warning text-dark">
                        Pending
                      </span>
                    )}
                  </td>

                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteUser(user._id)}
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

export default Users;