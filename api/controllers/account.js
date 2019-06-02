const ethplorer = require('../lib/ethplorer.service');
const web3lib = require('../lib/web3.service');
const DAI = 'DAI';
const ETH = 'ETH';
const errorParams = [{
    code: 'R001',
    message: 'Bad request params'
  },
  {
    code: 'A001',
    message: 'Address format error'
  },

]

let _address = ''
async function balance(req, res) {
  try {
    let {
      address
    } = req.params
    _address = address
    
    //address validations
    const isvalid = web3lib.isAddress(address)
    if (!isvalid) throw errorParams[1]

    const accountData = await ethplorer.getAddressInfo(address)
    const tokensTop = await ethplorer.getTop()

    let data = handlerData(tokensTop, address, accountData);

    res.json(data)

  } catch (error) {
    handler(error, res)
  }


}
exports.balance = balance;

 


async function getTop(req, res) {
  try {

    const data = await ethplorer.getTop()

    res.json({
      data
    })

  } catch (error) {
    handler(error, res)
  }
}
 


async function getTokens() {
  try {
    const accountData = await ethplorer.getAddressInfo(_address)
    const tokensTop = await ethplorer.getTop()
    let data = handlerData(tokensTop, _address, accountData);
    
    return data.tokens

  } catch (error) {

  }
}
exports.getTokens = getTokens;



function handlerData(tokensTop, address, accountData) {
  let data = {
    address,
    ETH: {
      balance: accountData.ETH.balance
    },
    tokens: [],
    totalTokensBalance: 0
    
  }
  if (tokensTop.tokens){
  const _ethToken = tokensTop.tokens.filter(token => token.symbol === ETH)[0];
   data = {
    address,
    ETH: {
      balance: accountData.ETH.balance,
      rate: _ethToken.price.rate,
      currentvalue: accountData.ETH.balance * _ethToken.price.rate
    },
     
    };
  }
  if (accountData.tokens) {
    let mappingToken =  mapping(accountData.tokens);
 
    let sum = 0;
      data.totalTokensBalance = mappingToken.reduce((a, b) => {
      if (a.currentValue > 0 && b.currentValue > 0) {
        sum = Number(a.currentValue) + Number(b.currentValue)
      }
      return sum;
     })
     data.tokens = [...mappingToken];
  }
 
  return data;
}

function mapping(tokens){
  let mappingTokens = tokens.map(token => {
    let price = token.tokenInfo.price ? token.tokenInfo.price.rate : 0;
    let tokenBalance = token.balance / 10 ** token.tokenInfo.decimals;
    return {
      symbol: token.tokenInfo.symbol,
      balance: tokenBalance,
      rate: price,
      currentValue: tokenBalance * price
    };
  });
  return mappingTokens;
}
exports.mapping = mapping;


/**
 * Handler
 * Error handler
 * @param {*} err
 * @param {*} res
 * @returns code: err
 */
function handler(err, res) {

  if (err) {
    if (err.message) {
      return res.status(500).send({
        code: err.code,
        message: err.message
      });
    } else {
      return res.status(500).send({
        code: err
      });
    }
  }

  return res.status(500).send({
    code: "500",
    message: "Internal Server error"
  });
}
