import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../../fbConfig";
import { fetchUser } from "../profileContext/profileActions";

/**
 * @description Async method for creating new ad
 * @param {object} adData - ad data for posting to ads collection
 * @returns {boolean} - true if ad is created, undefined otherwise
 */
export const createAd = async (adData) => {
    const {title, vType, description, contact, price, location, imgs} = adData;

    try {
        await addDoc(collection(db, 'ads'), {
            title, 
            type: vType.toLowerCase(),
            description,
            contact,
            location,
            price,
            isSold: false,
            publishedAt: Timestamp.fromDate(new Date()),
            images: imgs,
            createdBy: auth.currentUser.uid
        });
        return true;
    } catch (error) {
        console.log(error);
    }

}

// ! 🔽 Stari nacin - dobavljanje svih ad-ova bez slusanja live izmena
/**
 * @description Get all ads
 * @returns {Array} - all ads unsold ads
 */
export const getAllAds = async () => {
    const q = query(
        collection(db, 'ads'),
        where('isSold', '==', false)
    ); // ! build-ujemo firestore query koji ce iz ads kolekcije dobaviti samo one ad-ove koji nisu prodati (kod kojih je isSold = false)

    try {
        const querySnapshot = await getDocs(q);
        const unsoldAds = querySnapshot.docs
            .map(doc => ({id: doc.id, ...doc.data()}));
        return unsoldAds;
    } catch (error) {
        console.log(error);
    }
}

// * 🌟 Novi nacin - sa slusanjem live izmena
/**
 * @description Live listening to ALL ads change in DB
 * @param {object} adsFilter - ads filter config object
 * @param {function} onAdsReceived - callback function to return recevied live ads
 * @returns {function} unsubscribe function
 */
export const subscribeToAllAds = (adsFilter, onAdsReceived) => {
    let q = query(
        collection(db, 'ads'),
        where('isSold', '==', false)
    );

    if (adsFilter) {
        Object.keys(adsFilter).forEach(filterKey => {
            q = filterKey === 'publishedAt'
                ? query(q, where(filterKey, '>=', adsFilter[filterKey]))
                : query(q, where(filterKey, '==', adsFilter[filterKey]))
        });
    }

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const unsoldAds = querySnapshot.docs
            .map(doc => ({id: doc.id, ...doc.data()}));
        const creatorsIds = [...new Set(unsoldAds.map(ad => ad.createdBy))]; // niz unikatnih ID-eva kreatora svih ogalsa
        const userPromises = creatorsIds.map(fetchUser);
        const users = await Promise.all(userPromises);
        const usersById = users.reduce((acc, user) => {
            acc[user.uid] = user; 
            return acc;
        }, {});
        const allAdsWithCreatorDetails = unsoldAds.map(ad => ({
            ...ad,
            user: usersById[ad.createdBy]
        }));
        onAdsReceived(allAdsWithCreatorDetails);
    }, (error) => {
        console.log(error);
    });
    return unsubscribe;
}

// ! 🔽 Stari nacin - dobavljanje korisnikovih ad-ova bez slusanja live izmena
/**
 * @description Get all ads for user
 * @param {string} userId - user id to fetch ads for
 * @returns {array} all ads for user 
 */
export const getAdsForUser = async (userId) => {
    const q = query(
        collection(db, 'ads'),
        where('createdBy', '==', userId)
    );
    try {
        const querySnapshot = await getDocs(q);
        const adsForUser = querySnapshot.docs
            .map(doc => ({id: doc.id, ...doc.data()}));
        return adsForUser;
    } catch (error) {
        console.log(error);
    }
}

// * 🌟 Novi nacin - sa slusanjem live izmena
/**
 * @description Live listening to USER'S ads change in DB
 * @param {string} userId - id of user to fetch ads for
 * @param {object} adsFilter - filter config object
 * @param {function} onAdsReceived - callback function to return recevied live ads
 * @returns {function} unsubscribe function
 */
export const subscribeToAdsForUser = (userId, adsFilter, onAdsReceived) => {
    let q = query(
        collection(db, 'ads'),
        where('createdBy', '==', userId)
    );

    if (adsFilter) {
        Object.keys(adsFilter).forEach(filterKey => {
            q = filterKey === 'publishedAt'
                ? query(q, where(filterKey, '>=', adsFilter[filterKey]))
                : query(q, where(filterKey, '==', adsFilter[filterKey]))
        });
    }

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const adsForUser = querySnapshot.docs
            .map(doc => ({id: doc.id, ...doc.data()}));
        const creatorsIds = [...new Set(adsForUser.map(ad => ad.createdBy))]; // niz unikatnih ID-eva kreatora svih ogalsa
        const userPromises = creatorsIds.map(fetchUser);
        const users = await Promise.all(userPromises);
        const usersById = users.reduce((acc, user) => {
            acc[user.uid] = user; 
            return acc;
        }, {});
        const allAdsWithCreatorDetails = adsForUser.map(ad => ({
            ...ad,
            user: usersById[ad.createdBy]
        }));
        onAdsReceived(allAdsWithCreatorDetails);
    }, (error) => {
        console.log(error);
    });

    return unsubscribe;
}

/**
 * @description Update ad handler
 * @param {string} adId - id of ad to update
 * @param {object} adData - data to be updated
 * @returns {boolean} true if updated, undefined otherwise
 */
export const updateAd = async (adId, adData) => {
    const {title, vType, description, price, contact, location, imgs} = adData;
    const adRef = doc(db, 'ads', adId);

    const updateData = {
        title,
        type: vType.toLowerCase(),
        price,
        description,
        location,
        contact
    }

    if (imgs?.length) {
        updateData.images = imgs;
    }

    try {
        await updateDoc(adRef, updateData);
        return true;
    } catch (error) {
        console.log(error);
    }
}

/**
 * @description Async handler for marking ad as sold
 * @param {string} adId - ad id 
 * @returns {boolean} true if updated as sold, udnefined otherwise
 */
export const updateAsSold = async (adId) => {
    const adRef = doc(db, 'ads', adId);
    try {
        await updateDoc(adRef, {
            isSold: true
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}

/**
 * @description Async handler for deleting an ad
 * @param {string} adId - Ad id for delete
 */
export const deleteAdById = async (adId) => {
    try {
        await deleteDoc(doc(db, 'ads', adId));
        return true;
    } catch (error) {
        console.log(error);
    }
}