const level = require('level')
const dbServer = require('./server.js')
const port = 7001

var db = level('./db')

dbServer(port, db, function(){
  console.log('DB Server listening on '+port)
})