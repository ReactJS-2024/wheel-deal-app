import { useContext, useEffect, useState } from "react"
import AdContext from "../../context/adContext/AdContext";
import { getAllAds } from "../../context/adContext/adActions";
import ActionTypes from "../../context/adContext/adActionTypes";
import NoDataMsg from "../shared/NoDataMsg";


function AllAds() {

    const [adsList, setAdsList] = useState([]);
    const {allAds, dispatch} = useContext(AdContext);

    useEffect(() => {
        async function fetchData() {
            if (!allAds.length) {
                const allAds = await getAllAds();
                dispatch({
                    type: ActionTypes.SET_ALL_ADS,
                    payload: allAds
                });
                setAdsList(allAds);
            } else {
                setAdsList(allAds);
            }
        }
        fetchData();
    }, [allAds, dispatch]);

    if (!adsList) {
        return <NoDataMsg messageText='Data is loading...' />
    }

    // TODO OVDE smo stali na 16. casu
    return (
        <div>
            {adsList.map(ad => (
                <div key={ad.id}>{ad.title}</div>
            ))}
        </div>
    )
}

export default AllAds