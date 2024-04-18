import { Timestamp, addDoc, collection, getDocs, query, where } from "firebase/firestore";
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