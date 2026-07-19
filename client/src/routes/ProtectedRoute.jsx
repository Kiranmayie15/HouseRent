import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        return <Navigate to="/" />;
    }

    if (role && user.userType !== role) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;