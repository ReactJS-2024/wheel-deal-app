/**
 * @description Util that converts fb timestamp to euro format of date
 * @param {object} timestamp 
 * @returns string format of date
 */
export const convertFBTimestampToDate = (timestamp) => {
    const toDate = new Date(timestamp.seconds * 1000);
    const formattedDate = toDate.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }); // 11.04.2024
    return formattedDate + '.'; // 11.04.2024.
}