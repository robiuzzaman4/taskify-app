import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";

const PrivetRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Spinner />
    }

    if (user) {
        return children;
    }

    return <Navigate to="/sign-in" state={{ from: location }} replace />
};

export default PrivetRoute;