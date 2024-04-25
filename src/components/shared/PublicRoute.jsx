import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/authContext/AuthContext";

function PublicRoute() {
    const { isAuthenticated, checkingStatus } = useContext(AuthContext);
    const [readyToRender, setReadyToRender] = useState(false);

    useEffect(() => {
        if (!checkingStatus) {
            setReadyToRender(true);
        }
    }, [checkingStatus]);

    if (!readyToRender) {
        return <h1>Spinner Placeholder</h1>
    }

    if (isAuthenticated) {
        return <Navigate to='/' replace />;
    }

    return <Outlet />;
}

export default PublicRoute;
