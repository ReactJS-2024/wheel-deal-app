import { useContext, useEffect, useState } from "react"
import AdContext from "../../context/adContext/AdContext";
import { getAdsForUser, getAllAds } from "../../context/adContext/adActions";
import ActionTypes from "../../context/adContext/adActionTypes";
import NoDataMsg from "../shared/NoDataMsg";
import AdCard from "./AdCard";
import { auth } from "../../fbConfig";


function AllAds({fetchUserAds, userId}) {

    const [adsList, setAdsList] = useState([]);
    const {allAds, adsForUser, dispatch} = useContext(AdContext);

    useEffect(() => {
        async function fetchData() {
            let fetchedAds;
            if (fetchUserAds) {
                const isLoggedUserAds = adsForUser?.some(ad => ad.createdBy === userId);
                fetchedAds = isLoggedUserAds ? adsForUser : await getAdsForUser(userId);
                if (!adsForUser.length) {
                    dispatch({
                        type: ActionTypes.SET_ADS_FOR_USER,
                        payload: fetchedAds
                    });
                }
            } else {
                fetchedAds = allAds?.length ? allAds : await getAllAds();
                if (!allAds.length) {
                    dispatch({
                        type: ActionTypes.SET_ALL_ADS,
                        payload: fetchedAds
                    });
                }
            }
            setAdsList(fetchedAds);
        }
        fetchData();
    }, [allAds, adsForUser, userId, dispatch]);

    if (!adsList) {
        return <NoDataMsg messageText='Data is loading...' />
    }

    return (
        <div>
            <div className="custom-cards-wrapper">
                {adsList.map(ad => (
                    <AdCard 
                        cardData={ad}
                        isEditEnabled={fetchUserAds && userId === auth.currentUser.uid}
                    />
                ))}
            </div>
        </div>
    )
}

export default AllAds