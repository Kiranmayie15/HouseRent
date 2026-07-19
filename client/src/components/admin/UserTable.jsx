import React from "react";
import {
  Table,
  Button,
  Badge,
} from "react-bootstrap";

const UserTable = ({
  users,
  onDelete,
  onApprove,
}) => {
  return (
    <Table
      striped
      bordered
      hover
      responsive
      className="shadow-sm"
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
        {users.length > 0 ? (
          users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>

              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>{user.phone}</td>

              <td>
                <Badge bg="info">
                  {user.userType}
                </Badge>
              </td>

              <td>
                {user.userType === "Owner" ? (
                  user.isApproved ? (
                    <Badge bg="success">
                      Approved
                    </Badge>
                  ) : (
                    <Badge bg="warning">
                      Pending
                    </Badge>
                  )
                ) : (
                  <Badge bg="primary">
                    Active
                  </Badge>
                )}
              </td>

              <td>
                {!user.isApproved &&
                  user.userType === "Owner" && (
                    <Button
                      size="sm"
                      variant="success"
                      className="me-2"
                      onClick={() =>
                        onApprove(user._id)
                      }
                    >
                      Approve
                    </Button>
                  )}

                <Button
                  size="sm"
                  variant="danger"
                  onClick={() =>
                    onDelete(user._id)
                  }
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={7}
              className="text-center"
            >
              No Users Found
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default UserTable;