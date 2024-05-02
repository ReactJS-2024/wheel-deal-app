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

/**
 * @description Converts string price to number price
 * @param {string} price - price to convert
 * @returns {number} number format price
 */
const convertPriceStringToNumber = (price) => {
    return +(price.replace(/\./g, '')); // 24.000 => 24000
}

const euroCurrencyValueFormatterToNumber = (value) => {
    const numericValue = +(value.replace('.', ''));
    const formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
    });
    return formatter.format(numericValue);
}
 
export {euroCurrencyValueFormatter, formatPrice, convertPriceStringToNumber, euroCurrencyValueFormatterToNumber};
