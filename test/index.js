const level = require('level')
const multilevel = require('multilevel')
const assert = require('assert')
const net = require('net')
const levelup = require('levelup')
const memdown = require('memdown')
const dbServer = require('../server.js')
const port = 7001

var db = level('../db')
var memdb = levelup('/does/not/matter', { db: memdown })

db.open(function(){

  dbServer(port, memdb, function(){
    
    var transport = net.connect(port);

    var db = multilevel.client()
    transport.pipe(db.createRpcStream()).pipe(transport)

    db.put('test', 'abc123', function(){
      db.get('test', function(err, value){
        assert(value === 'abc123')
        db.del('test', function(err){
          db.get('test', function(err, value){
            assert(!!err)
            process.exit(0)
          })
        })
      })
    })

  })

})