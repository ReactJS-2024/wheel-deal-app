import { doc, getDoc } from "firebase/firestore"
import { db } from "../../fbConfig"

/**
 * @description Async method to fetch user data based on passed userId
 * @param {string} userId - user id
 * @returns null if user under given id doesn't exist, userData otherwise
 */
export const fetchUser = async (userId) => {
    try {
        // ! Return Early pattern (obrazac)
        const docSnapshot = await getDoc(doc(db, 'users', userId));
        if (!docSnapshot.exists()) {
            return;
        }
        const userData = docSnapshot.data();
        return userData;
    } catch (error) {
        console.log(error);
    }
}