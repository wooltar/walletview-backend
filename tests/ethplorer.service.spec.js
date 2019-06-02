const assert = require('assert')
const ethplorer = require('../api/lib/ethplorer.service')
 

let server
before(function( ){
    server = require('../api/app.js');
   
 });

 
describe("ethplorer ", async () => {
    it("should get address info from ethplorer ", async () => {
        const address = '0xad9eb619ce1033cc710d9f9806a2330f85875f22'
        
        const accountData = await ethplorer.getAddressInfo(address)

        assert.equal(accountData.address, address);
    });
     
    
})
