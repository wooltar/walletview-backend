const express = require('express')
const router = express.Router()
const transaction = require('../controllers/account')

router.route('/balance/:address').get(transaction.balance)

module.exports = router
