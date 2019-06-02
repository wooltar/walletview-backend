const connector = require('./axiosConnector');
const key='?apiKey=freekey'

/**
 * Get Address data 
 *
 * @param {*} address
 * @returns
 */
async function getAddressInfo(address) {
    const methodName = `getAddressInfo/`
    return await connector.request('GET', methodName, null, address, key)

}
exports.getAddressInfo = getAddressInfo;

/**
 * get top 50 crypto currency data
 *
 * @param {*} address
 * @returns {Observa}
 */
async function getTop() {
    const methodName = `getTop/`
    return await connector.request('GET', methodName, null, null, key)

}
exports.getTop = getTop;