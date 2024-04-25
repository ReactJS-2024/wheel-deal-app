import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../../fbConfig";

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
 * @param {function} onAdsReceived - callback function to return recevied live ads
 * @returns {function} unsubscribe function
 */
export const subscribeToAllAds = (onAdsReceived) => {
    const q = query(
        collection(db, 'ads'),
        where('isSold', '==', false)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const unsoldAds = querySnapshot.docs
            .map(doc => ({id: doc.id, ...doc.data()}));
        onAdsReceived(unsoldAds);
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
 * @param {function} onAdsReceived - callback function to return recevied live ads
 * @returns {function} unsubscribe function
 */
export const subscribeToAdsForUser = (userId, onAdsReceived) => {
    const q = query(
        collection(db, 'ads'),
        where('createdBy', '==', userId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const adsForUser = querySnapshot.docs
            .map(doc => ({id: doc.id, ...doc.data()}));
        onAdsReceived(adsForUser);
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