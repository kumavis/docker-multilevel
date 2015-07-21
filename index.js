const level = require('level')
const dbServer = require('./server.js')
const port = process.env.PORT || 9000

var db = level('./db')

dbServer(port, db, function(err){
  if (err) console.error(err)
  console.log('DB Server listening on '+port)
})