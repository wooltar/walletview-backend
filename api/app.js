const session = require('express-session')

const express = require('express')
const app = express()
const http = require('http');
const socketIo = require('socket.io');
const server = http.Server(app);
const io = socketIo(server);

const bodyParser = require('body-parser')
const cors = require('cors')

 
const controller =  require('./controllers/account');

// Add helmet package in order to secure express
const helmet = require('helmet')

const port= 9000;

 
// Add cors middleware in order to allow just the origin domain
// for security reasons
const whitelist = [ 'http://localhost', 'http://localhost:4200', 'http://locahost:5000' ]

// Add cors middleware in order to allow just the origin domain
// for security reasons
app.use(cors({
  origin: whitelist 
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}))

// parse application/json
app.use(bodyParser.json())

// Limit maximum size of payload for HTTP body in body in express
app.use(bodyParser.json({
  limit: '2mb'
}))
// Add helmet middleware for securing HTTP response
app.use(helmet())

// Enable trust proxy in order to get real client IP address instead of
// nginx reverse proxy IP address. This is useful for security in blacklist
// of IP addresses
app.set('trust proxy', 2)

 


// define routes
const router = express.Router()
require('./routes/index.js')(router)

router.route('/').get(function (req, res, next) {
  res.json({
    'message': 'StableCoin REST API'
  })
})

app.use('/api/v1', router)


// listen for requests
server.listen(port, '0.0.0.0', function () {
  console.log(new Date())
  console.log(`Connected to localhost on port ${port}`)
})

 
exports.server = server;