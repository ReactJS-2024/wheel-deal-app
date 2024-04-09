import { useEffect, useState } from "react"
import { auth } from "../fbConfig";

export const useUserAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    useEffect(() => {
        if (auth.currentUser) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
        setCheckingStatus(false);
    }, [auth.currentUser]);

    return {loggedIn, checkingStatus};
}