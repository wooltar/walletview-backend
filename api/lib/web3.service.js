const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
/**
 * isAdrress
 * check if is a valid address
 * @param {*} address
 * @returns boolean
 */
function isAddress(address) {    
    return web3.utils.isAddress(address)
}
exports.isAddress = isAddress


