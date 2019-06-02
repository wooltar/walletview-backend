const assert = require('assert')
const web3Service = require('../api/lib/web3.service')
 

let server
before(function( ){
    server = require('../api/app.js');
   
 });

 
describe("isAddress ", ()=> {
    it("good address must be valid ", () => {
        const address = '0x6A260aeae009B1a2D234C5795663c29522b41668'
        assert.equal(web3Service.isAddress(address), true);
    });
    it("wrong address must be not valid ", () => {
        const address = '0x6A260aeae009B1a2D234C5795663c29522b416'
        assert.equal(web3Service.isAddress(address), false);
    });
})
