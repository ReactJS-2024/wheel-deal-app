import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../fbConfig";

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
            images: imgs
        });
        return true;
    } catch (error) {
        console.log(error);
    }

}