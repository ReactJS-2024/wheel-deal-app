import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../../context/authContext/AuthContext";

function PublicRoute() {
    const { isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated) {
        return <Navigate to='/' replace />;
    }

    return <Outlet />;
}

export default PublicRoute;
