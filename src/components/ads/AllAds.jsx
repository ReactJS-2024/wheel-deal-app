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
            if (fetchUserAds) {
                if (!adsForUser.length) {
                    const adsForUser = await getAdsForUser(userId);
                    dispatch({
                        type: ActionTypes.SET_ADS_FOR_USER,
                        payload: adsForUser
                    });
                    setAdsList(adsForUser);
                } else {
                    setAdsList(adsForUser);
                }
            } else {
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
        }
        fetchData();
    }, [allAds, dispatch]);

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