/**
* @description Convert value to EURO currency
* @param {String} value
* @returns formatted value
*/
const euroCurrencyValueFormatter = (value) => {
    const formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
    });
    return formatter.format(value);
}
 
/**
 * @description Formatts the price with dot separator
 * @param {String} price
 * @returns formatted price
*/
const formatPrice = (price) => {
    const numericValue = price.replace(/[^0-9]/g, '');
    return new Intl.NumberFormat('de-DE').format(numericValue);
}
 
export {euroCurrencyValueFormatter, formatPrice};