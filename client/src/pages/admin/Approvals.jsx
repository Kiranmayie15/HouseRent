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
  Badge,
} from "react-bootstrap";

import { toast } from "react-toastify";

const Approvals = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingOwners();
  }, []);

  const fetchPendingOwners = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/admin/pending-users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOwners(res.data.users || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load pending owners");
    } finally {
      setLoading(false);
    }
  };

  const approveOwner = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/admin/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Owner approved successfully");
      fetchPendingOwners();
    } catch (error) {
      console.log(error);
      toast.error("Failed to approve owner");
    }
  };

  const rejectOwner = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/admin/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Owner rejected");
      fetchPendingOwners();
    } catch (error) {
      console.log(error);
      toast.error("Failed to reject owner");
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
              Owner Approval Requests
            </h2>
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

              <th>Name</th>

              <th>Email</th>

              <th>Phone</th>

              <th>User Type</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {owners.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="text-center"
                >
                  No Pending Requests
                </td>

              </tr>

            ) : (

              owners.map((owner, index) => (

                <tr key={owner._id}>

                  <td>{index + 1}</td>

                  <td>{owner.name}</td>

                  <td>{owner.email}</td>

                  <td>{owner.phone}</td>

                  <td>{owner.userType}</td>

                  <td>

                    {owner.isApproved ? (
                      <Badge bg="success">
                        Approved
                      </Badge>
                    ) : (
                      <Badge bg="warning">
                        Pending
                      </Badge>
                    )}

                  </td>

                  <td>

                    {!owner.isApproved && (

                      <>
                        <Button
                          variant="success"
                          size="sm"
                          className="me-2"
                          onClick={() =>
                            approveOwner(owner._id)
                          }
                        >
                          Approve
                        </Button>

                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() =>
                            rejectOwner(owner._id)
                          }
                        >
                          Reject
                        </Button>
                      </>

                    )}

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

export default Approvals;