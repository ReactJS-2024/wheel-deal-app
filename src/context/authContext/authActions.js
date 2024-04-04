import {createUserWithEmailAndPassword, sendPasswordResetEmail, signOut} from 'firebase/auth';
import {Timestamp, setDoc, doc} from 'firebase/firestore';
import { auth, db } from '../../fbConfig';

/**
 * @description Async method for handling user register on firebase
 * @param {object} formData - form data is an object holding data for new user
 * @returns {object} user - user that is created
 */
export const registerUser = async (formData) => {
    const {email, password, firstName, lastName, userName} = formData;
    
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', result.user.uid), {
            uid: result.user.uid,
            firstName,
            lastName,
            userName,
            email,
            createdAt: Timestamp.fromDate(new Date())
        });
        return result.user;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * @description Async method for signing user out (logging out)
 * @returns {boolean} true if logged out, undefined otherwise
 */
export const logoutUser = async () => {
    // const currentUser = auth.currentUser; // ! objekat koji cuva trenutno ulogovanog korisnika auth instance
    try {
        await signOut(auth);
        return true;
    } catch (error) {
        console.log(error);
    }
}

/**
 * @description Async method for sending reset password link to user's email
 * @param {string} email - email to send password
 * @returns {boolean} true if email sent, undefined othewise
 */
export const sendForgotPasswordEmail = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return true;
    } catch (error) {
        console.log(error);
    }
}