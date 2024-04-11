import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/authContext/AuthContext";


function ProtectedRoute() {
    // backup opcija - isAuthenticated check (umesto custom hook-a)
    const {isAuthenticated} = useContext(AuthContext);
    
    if (!isAuthenticated) {
        return <Navigate to={'/auth/login'} />
    }

    return <Outlet />
}

export default ProtectedRoute