import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/authContext/AuthContext";
import CustomSpinner from "./Spinner";


function ProtectedRoute() {
    // backup opcija - isAuthenticated check (umesto custom hook-a)
    const { isAuthenticated, checkingStatus } = useContext(AuthContext);
    
    if (checkingStatus) {
        return <CustomSpinner/>
    }

    if (!isAuthenticated) {
        return <Navigate to='/auth/login' replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute