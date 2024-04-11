import { doc, getDoc, updateDoc } from "firebase/firestore"
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

/**
 * @description Async handler for updating profile data
 * @param {object} user - current user
 * @param {object} data - data to modify 
 * @return {object} user updated
 */
export const updateUserData = async (user, data) => {
    
    const {firstName, lastName, userName, email} = data;

    try {
        await updateDoc(doc(db, 'users', user.uid), {
            firstName,
            lastName,
            userName,
            email
        });
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        return userDoc.exists() ? userDoc.data() : null;
    } catch (error) {
        console.log(error);
    }
}