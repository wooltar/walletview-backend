const axios = require('axios');
const path = require('path');

const rootDir = path.resolve('./') 
console.log(rootDir)
require('dotenv').config({path: rootDir + '/.env' });
const baseURL = process.env.EXTERNAL_SERVER
 
/**
 * axiosRequest
 * external server request
 * @param {*} method GET, POST...
 * @param {*} methodName function to call
 * @param {*} data data to send
 * @param {*} params  params
 * @returns
 */
async function request (method, methodName, data, address, key, params) {

    try {

        const config = {
           baseURL: `${baseURL}`,
            method: method,
            url: `${methodName}${address}${key}`,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json'
              },
            params: params,
            data: data
        }
    
        const response = await axios(config)
        if (response.status != 200 && response.status != 201) {
          reportLogger(response, methodName, data)
        }
 
        return response.data

    } catch (err) {

        console.error('Error external server:'+ err)
      
        handlerError(err, methodName);
         
    }
}
 exports.request = request;
 
/**
 * handlerError
 *
 * @param {*} item
 */
function handlerError(err, methodName) {
     
     
    try {
        const error = {
            code: err.code,
            message: err.message,
            methodName
        }
        return error
    } catch (err) {

        throw err
    }

}

/**
 * ReportLogger
 * Write a report in log file
 * @param {*} response
 * @param {*} methodName
 * @param {*} data
 */
function reportLogger(response, methodName, data) {
    console.error('-------_Credoraz_Http_Error_------')
    console.error('Status:' + response.status)
    console.error(response.body.Mesager)
    console.error('methodName: ' + methodName);
    console.error('data request');
    console.error(data);
    console.error('-------------end-report------------');

    throw response.status + ": " + response.body.Message

}

