
const dotenv = require('dotenv');
dotenv.config({path: './env'});
const request = require("request");
const assert = require('assert');

const port = process.env.SERVER_PORT || 9000
const host = `http://localhost`;
const hostName = `${host}:${port}/api/v1`
 
 
const url_base = `${hostName}`;
 
const options = {
       
    headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
    },
    body: {
         
       
    },
    json: true
};

describe("Account Tests", () => {
    let server
    before(function( ){
        server = require('../api/app.js');
       
     });
    

    it('should return address data', function(done) {
        let address = '0xad9eb619ce1033cc710d9f9806a2330f85875f22'
        
        let url_base_page = `${url_base}/balance/${address}`

        request.get(url_base_page, function(error, response, body) {
            let _body = JSON.parse(body);
            assert.equal(response.statusCode, 200);
            assert.equal(_body.address, address)
            assert.notEqual(_body.tokens.lenght, 0)
          
            done();
        });
    });
    
 
    it('should return 500 and error message', function(done) {
        let address = '0x0000000000xxxxxxxxxxxxxxxx00000000000'

        let messageExpected = 'Address format error'
        let codeExpected = 'A001'

        let url_base_page = `${url_base}/balance/${address}`
        request.get(url_base_page, function(error, response, body) {
         let _body = JSON.parse(body);
            assert.equal(response.statusCode, 500);
            assert.equal(_body.code, codeExpected)
            assert.equal(_body.message, messageExpected)
          
            done();
        });
    });
    
   

    
  
});