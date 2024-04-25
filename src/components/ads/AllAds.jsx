import { useContext, useEffect, useState } from "react"
import AdContext from "../../context/adContext/AdContext";
import { subscribeToAdsForUser, subscribeToAllAds } from "../../context/adContext/adActions";
import ActionTypes from "../../context/adContext/adActionTypes";
import NoDataMsg from "../shared/NoDataMsg";
import AdCard from "./AdCard";
import { auth } from "../../fbConfig";


function AllAds({fetchUserAds, userId}) {

    const [adsList, setAdsList] = useState([]);
    const {dispatch} = useContext(AdContext);

    useEffect(() => {
        let unsubscribe;
        if (fetchUserAds) {
            unsubscribe = subscribeToAdsForUser(userId, (fetchedAds) => {
                dispatch({
                    type: ActionTypes.SET_ADS_FOR_USER,
                    payload: fetchedAds
                });
                setAdsList(fetchedAds);
            });
        } else {
            unsubscribe = subscribeToAllAds((fetchedAds) => {
                dispatch({
                    type: ActionTypes.SET_ALL_ADS,
                    payload: fetchedAds
                });
                setAdsList(fetchedAds);
            });
        }
        return () => unsubscribe();

        // ! 🔽 Starin nacin - bez slusanja live izmena 🔽
        /*
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
        */
    }, [userId, dispatch]);

    if (!adsList?.length) {
        return <NoDataMsg messageText='Data is loading...' />
    }

    return (
        <div>
            <div className="custom-cards-wrapper">
                {adsList.map(ad => (
                    <AdCard 
                        key={ad.id}
                        cardData={ad}
                        isEditEnabled={fetchUserAds && userId === auth.currentUser.uid}
                    />
                ))}
            </div>
        </div>
    )
}

export default AllAds