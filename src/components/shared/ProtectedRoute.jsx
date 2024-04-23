import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/authContext/AuthContext";
import NoDataMsg from "./NoDataMsg";


function ProtectedRoute() {
    // backup opcija - isAuthenticated check (umesto custom hook-a)
    const { isAuthenticated, checkingStatus } = useContext(AuthContext);
    
    if (checkingStatus) {
        return <NoDataMsg messageText='Data is loading' />;
    }

    if (!isAuthenticated) {
        return <Navigate to='/auth/login' replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute