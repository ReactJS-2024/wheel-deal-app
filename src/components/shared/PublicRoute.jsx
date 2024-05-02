import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/authContext/AuthContext";
import CustomSpinner from "./Spinner";

function PublicRoute() {
    const { isAuthenticated, checkingStatus } = useContext(AuthContext);
    const [readyToRender, setReadyToRender] = useState(false);

    useEffect(() => {
        if (!checkingStatus) {
            setReadyToRender(true);
        }
    }, [checkingStatus]);

    if (!readyToRender) {
        return <CustomSpinner />
    }

    if (isAuthenticated) {
        return <Navigate to='/' replace />;
    }

    return <Outlet />;
}

export default PublicRoute;
