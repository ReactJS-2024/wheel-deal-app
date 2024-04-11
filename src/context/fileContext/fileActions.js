import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../fbConfig";
import { doc, updateDoc } from "firebase/firestore";

/**
 * @description Upload single image for given collection
 * @param {string} imgRef - img reference
 * @param {object} file - file to be uploaded
 * @param {string} objectName - object name
 * @param {string} uid - user id
 * @returns {string} full download url for uploaded file
 */
export const uploadSingleImage = async (imgRef, file, objectName, uid) => {
    try {
        const result = await uploadBytes(imgRef, file);
        const downloadUrl = await getDownloadURL(ref(storage, result.ref.fullPath));
        updateDoc(doc(db, objectName, uid), {
            photoUrl: downloadUrl,
            photoPath: result.ref.fullPath
        });
        return downloadUrl;
    } catch (error) {
        console.log(error);
    }
}

/**
 * @description Async handler for removing single file
 * @param {string} objectName - object name
 * @param {string} uid - uid
 * @return {boolean} true if file is removed, undefined otherwise
 */
export const removeSingleImage = async (objectName, uid) => {
    try {
        await updateDoc(doc(db, objectName, uid), {
            photoUrl: '',
            photoPath: ''
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}